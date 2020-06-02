import { getTodos } from './query'
import { createTodo } from './mutation'

const resolvers = {
  Query: {
    getTodos,
  },
  Mutation: {
    createTodo: async (_, args) => await createTodo(args),
  },
}

export default resolvers
