// import faker from 'faker'
import client from './client'

export const getTodos = async () => await client('todos').select()
