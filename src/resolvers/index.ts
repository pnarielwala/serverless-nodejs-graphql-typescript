import { getTodos } from './query'
import { createTodo, deleteTodo, completeTodo } from './mutation'
import { Resolvers } from 'generated/graphql'

const resolvers: Resolvers = {
  Query: {
    getTodos,
  },
  Mutation: {
    createTodo: async (_, { input }) => await createTodo(input),
    deleteTodo: async (_, { id }) => await deleteTodo(id),
    completeTodo: async (_, { id }) => await completeTodo(id),
  },
  Todo: {
    id: (todo) => todo.id,
    body: (todo) => todo.body,
    completed: (todo) => todo.completed,
  },
}

export default resolvers
