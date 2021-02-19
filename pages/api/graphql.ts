import { ApolloServer } from 'apollo-server-micro'
import { createContext } from '../../graphql/context'
import schema from '../../graphql/schema'

const server = new ApolloServer({
  schema,
  context: createContext,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default server.createHandler({
  path: '/api/graphql',
})
