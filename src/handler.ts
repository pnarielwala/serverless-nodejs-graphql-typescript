// handler.js's first job is to read the schema:

import { ApolloServer, gql } from 'apollo-server-lambda'
import resolvers from './resolvers'
import { APIGatewayEvent, Callback, Context } from 'aws-lambda'

const typeDefs = gql`
  type User {
    UUID: String
    Name: String
    Posts: [Post]
  }

  type Post {
    UUID: String
    Text: String
  }

  input UserInput {
    Name: String
    Posts: [PostInput]
  }

  input PostInput {
    Text: String
  }

  type Mutation {
    createUser(input: UserInput!): User
  }

  type Query {
    getUser(uuid: String!): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    // console.log(error)
    return error
  },
  formatResponse: (response) => {
    // console.log('response', response)
    return response
  },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
  playground: true,
  tracing: false,
})

exports.graphqlHandler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  const handler = server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
      methods: ['POST', 'GET'],
      allowedHeaders: ['Content-Type', 'Origin', 'Accept'],
    },
  })
  return handler(event, context, callback)
}
