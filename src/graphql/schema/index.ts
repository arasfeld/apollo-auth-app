import { GraphQLDate } from 'graphql-scalars'
import { decorateType, makeSchema } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import path from 'path'
import * as MutationTypes from './Mutation'
import * as QueryTypes from './Query'
import * as UserTypes from './User'

export const GQLDate = decorateType(GraphQLDate, {
  sourceType: 'Date',
  asNexusMethod: 'date',
})

const schema = makeSchema({
  types: [
    GQLDate,
    MutationTypes,
    QueryTypes,
    UserTypes,
  ],
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: path.join(process.cwd(), 'src/graphql/schema.graphql'),
    typegen: path.join(process.cwd(), 'node_modules/@types/nexus-typegen/index.d.ts'),
  },
  sourceTypes: {
    modules: [{
      module: '.prisma/client',
      alias: 'prisma',
    }],
  },
  contextType: {
    module: path.join(process.cwd(), 'src/graphql/context.ts'),
    export: 'Context',
  },
})

export default schema
