import faker from 'faker'
import client from './client'
import { convertToSnake } from '../utils'
import { TodoInput, Todo } from 'generated/graphql'

export const createTodo = async (input: TodoInput): Promise<Todo> => {
  return (
    await client
      .insert(convertToSnake(input))
      .into<Todo>('todos')
      .returning('*')
  )[0]
}

export const deleteTodo = async (id: string) => {
  const numRowsAffected = await client.from<Todo>('todos').where({ id }).del()

  if (!numRowsAffected) {
    throw 'No todos have been deleted!'
  }

  return id
}

export const completeTodo = async (id: string) => {
  try {
    const { id: completedTodoId } = await client
      .from<Todo>('todos')
      .where('id', id)
      .update<'id', Pick<Todo, 'id'>>({ completed: true }, ['id'])

    if (!completedTodoId) {
      throw 'Unable to complete todo item'
    }

    return completedTodoId
  } catch (e) {
    throw e
  }
}
