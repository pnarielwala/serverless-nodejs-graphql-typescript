import { gql } from 'apollo-server-lambda'

const schema = gql`
  type Todo {
    id: ID!
    body: String!
    completed: Boolean!
  }

  input TodoInput {
    body: String!
  }

  type Query {
    getTodos: [Todo!]
  }

  type Mutation {
    createTodo(input: TodoInput!): Todo!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`

export default schema
