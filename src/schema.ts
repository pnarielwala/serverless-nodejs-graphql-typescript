import { gql } from 'apollo-server-lambda'

const schema = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Tweet {
    id: ID!
    text: String!
    userId: ID!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
  }

  input TweetInput {
    text: String!
    userId: ID!
  }

  type Mutation {
    createUser(input: UserInput!): User!
    createTweet(input: TweetInput): Tweet!
  }

  type Query {
    getUser(email: String!): User!
    getUserTweets(id: ID!): [Tweet]
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

export default schema
