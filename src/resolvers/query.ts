import client from './client'
import { Todo } from 'generated/graphql'

export const getTodos = async () => await client<Todo>('todos').select()
