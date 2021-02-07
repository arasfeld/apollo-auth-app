import { AuthenticationError } from 'apollo-server-core'
import { arg, inputObjectType, mutationType, objectType } from 'nexus'
import { hashPassword, validatePassword } from '../../auth/password'
import { clearLoginSession, setLoginSession } from '../../auth/session'
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

export const Mutation = mutationType({
  definition(t) {
    t.field('login', {
      type: AuthResponse,
      args: { input: arg({ type: LoginInput }) },
      async resolve(_root, { input }, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: { email: input.email }
        })
        if (!user) throw new AuthenticationError('User does not exist')
        
        const valid = validatePassword(input.password, user.hashedPassword)
        if (!valid) throw new AuthenticationError('Password incorrect')

        await setLoginSession(ctx.res, user.id)

        return { user }
      }
    }),
    t.field('register', {
      type: AuthResponse,
      args: { input: arg({ type: RegisterInput }) },
      async resolve(_root, { input }, ctx) {
        const existingUser = await ctx.prisma.user.findUnique({
          where: { email: input.email }
        })
        if (existingUser) throw new Error('User already exists!')

        const user = await ctx.prisma.user.create({
          data: {
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
            hashedPassword: hashPassword(input.password),
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
