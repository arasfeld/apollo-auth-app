import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import jwt from 'jsonwebtoken'
import { MongoClient } from 'mongodb'
import { MongoDataSource } from './data-source'
import resolvers from './resolvers'
import schema from './schema'
import { AuthToken, User } from './types'

const MONGO_URI: string = process.env.MONGO_HOST || 'mongodb://localhost:27017/apollo-server'
const JWT_SECRET = process.env.JWT_SECRET || 'mysecret'

const app = express()
const port = process.env.PORT || 4000

const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
client.connect()

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.replace('Bearer ', '')
    const decodedToken = token && jwt.verify(token, JWT_SECRET) as AuthToken
    const userId = decodedToken && decodedToken.id
    return { userId }
  },
  dataSources: () => ({
    users: new MongoDataSource<User>(client.db().collection('users'))
  }),
})

server.applyMiddleware({ app })

app.listen({ port }, () => {
  console.log(`🚀  Server ready at http://localhost:${port}`)
})
