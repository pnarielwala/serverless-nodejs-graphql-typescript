import { TodoClient } from './client'
import { Todo } from 'generated/graphql'

export const getTodos = async () => {
  const data = await TodoClient.scan().exec()

  return data.toJSON() as Array<Todo>
}
