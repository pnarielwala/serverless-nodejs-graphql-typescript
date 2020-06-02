// handler.js's first job is to read the schema:

import { ApolloServer } from 'apollo-server-lambda'

import resolvers from './resolvers'
import schema from './schema'

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
})

exports.graphqlHandler = server.createHandler()
