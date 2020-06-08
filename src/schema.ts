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
    deleteTodo(id: String!): ID!
    completeTodo(id: String!): ID!
  }
`

export default schema
