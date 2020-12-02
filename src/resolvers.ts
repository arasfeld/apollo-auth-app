import { AuthenticationError } from 'apollo-server-core'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AuthPayload, Context, LoginPayload, SignupPayload, User } from './types'

const JWT_SECRET = process.env.JWT_SECRET || 'mysecret' // TODO: store this secret somewhere

export default {
  Query: {
    me: (_parent: void, _args: void, ctx: Context): Promise<User | null> =>
      ctx.db.collection('users').findOne({ _id: ctx.userId }),
  },
  Mutation: {
    login: async (_parent: void, args: LoginPayload, ctx: Context): Promise<AuthPayload> => {
      const user = await ctx.db.collection('users').findOne({ username: args.username })
      if (!user) throw new AuthenticationError('User does not exist')
    
      const passwordIsValid = await bcrypt.compare(args.password, user.hashedPassword)
      if (!passwordIsValid) throw new AuthenticationError('Password incorrect')
    
      const token = jwt.sign({ id: user._id }, JWT_SECRET)
    
      return { token }
    },
    signup: async (_parent: void, args: SignupPayload, ctx: Context): Promise<AuthPayload> => {
      const existingUser = await ctx.db.collection('users').findOne({ username: args.username })
      if (existingUser) {
        throw new Error('User already exists!')
      }
    
      const hashedPassword = await bcrypt.hash(args.password, 10)
      const result = await ctx.db.collection<User>('users').insertOne({
        username: args.username,
        hashedPassword
      })
    
      const token = jwt.sign({ id: result.insertedId }, JWT_SECRET)
    
      return { token }
    }
  }
}
