import faker from 'faker'
import client from './client'
import { convertToSnake } from '../utils'

export const createTodo = async (args: { input: { body: string } }) => {
  return (
    await client.insert(convertToSnake(args.input)).into('todos').returning('*')
  )[0]
}
