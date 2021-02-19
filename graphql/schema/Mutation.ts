import { arg, inputObjectType, mutationType, nonNull, objectType } from 'nexus'
import { hashPassword, validatePassword } from '../../lib/password'
import { clearLoginSession, setLoginSession } from '../../lib/session'
import { User } from './User'

export const AuthResponse = objectType({
  name: 'AuthResponse',
  definition(t) {
    t.field('user', { type: User })
  }
})

export const LoginInput = inputObjectType({
  name: 'LoginInput',
  definition(t) {
    t.nonNull.string('email')
    t.nonNull.string('password')
  }
})

export const RegisterInput = inputObjectType({
  name: 'RegisterInput',
  definition(t) {
    t.nonNull.string('email')
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.nonNull.string('password')
  }
})

const LOGIN_ATTEMPT_WINDOW_DURATION_MS = 100 * 60 * 5 // 5 minutes

export const Mutation = mutationType({
  definition(t) {
    t.field('login', {
      type: AuthResponse,
      args: { input: nonNull(arg({ type: LoginInput })) },
      async resolve(_root, { input }, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: { email: input.email }
        })
        if (!user) throw new Error('Invalid email or passphrase')
        
        const userSecrets = await ctx.prisma.userSecrets.findUnique({
          where: { userId: user.id }
        })

        if (
          userSecrets.firstFailedPasswordAttempt
          && userSecrets.firstFailedPasswordAttempt.getTime() > Date.now() - LOGIN_ATTEMPT_WINDOW_DURATION_MS
          && userSecrets.failedPasswordAttempts >= 3
        ) {
          throw new Error('User account locked - too many login attempts. Try again in 5 minutes')
        }

        // Not too many login attempts, let's check the password
        const valid = validatePassword(input.password, userSecrets.passwordHash)
        if (valid) {
          // Excellent - they're logged in! Let's reset the attempt tracking
          await ctx.prisma.userSecrets.update({
            where: { userId: user.id },
            data: {
              lastLoginAt: new Date(),
              failedPasswordAttempts: 0,
              firstFailedPasswordAttempt: null,
            }
          })
          // Set login session cookie for user
          await setLoginSession(ctx.res, user.id)
          return { user }
        } else {
          // Wrong password, bump all the attempt tracking figures
          const resetAttemptWindow =
            !userSecrets.firstFailedPasswordAttempt
            || userSecrets.firstFailedPasswordAttempt.getTime() < Date.now() - LOGIN_ATTEMPT_WINDOW_DURATION_MS
          await ctx.prisma.userSecrets.update({
            where: { userId: user.id },
            data: {
              failedPasswordAttempts: resetAttemptWindow ? 1 : { increment: 1 },
              firstFailedPasswordAttempt: resetAttemptWindow ? new Date() : userSecrets.firstFailedPasswordAttempt,
            }
          })
          throw new Error('Invalid email or passphrase')
        }
      }
    }),
    t.field('register', {
      type: AuthResponse,
      args: { input: nonNull(arg({ type: RegisterInput })) },
      async resolve(_root, { input }, ctx) {
        if (!input.email) {
          throw new Error('Email is required')
        }
        if (!input.password || input.password.length < 8) {
          throw new Error('Password is too weak')
        }

        const existingUser = await ctx.prisma.user.findUnique({
          where: { email: input.email }
        })
        if (existingUser) throw new Error('User already exists!')

        const user = await ctx.prisma.user.create({
          data: {
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
          }
        })
        await ctx.prisma.userSecrets.create({
          data: {
            userId: user.id,
            passwordHash: hashPassword(input.password),
          }
        })

        await setLoginSession(ctx.res, user.id)

        return { user }
      }
    }),
    t.boolean('logout', {
      resolve(_root, _args, ctx) {
        clearLoginSession(ctx.res)
        return true
      }
    })
  },
})
