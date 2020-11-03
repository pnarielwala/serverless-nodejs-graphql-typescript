// import faker from 'faker'
import { TodoClient } from './client'
import { TodoInput, Todo } from 'generated/graphql'
import { v4 as uuidv4 } from 'uuid'

export const createTodo = async (input: TodoInput): Promise<Todo> => {
  const newTodo = new TodoClient({
    id: uuidv4(),
    completed: false,
    ...input,
  })

  return await newTodo.save().then((data) => data.toJSON() as Todo)
}

export const deleteTodo = async (id: string) => {
  try {
    await TodoClient.delete({ id })
    return id
  } catch (e) {
    throw 'No todos have been deleted!'
  }
}

export const completeTodo = async (id: string) => {
  try {
    await TodoClient.update({ id }, { completed: true })

    return id
  } catch (e) {
    throw e
  }
}
