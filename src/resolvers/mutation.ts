import client from './client'
import { convertToSnake } from '../utils'

export const createUser = async (
  _: any,
  args: { input: { email: string; first_name: string; last_name: string } },
) =>
  (
    await client.insert(convertToSnake(args.input)).into('Users').returning('*')
  )[0]

export const createTweet = async (
  _: any,
  args: { input: { text: string; userId: number } },
) =>
  (
    await client
      .insert({ text: args.input.text, user_id: args.input.userId })
      .into('Tweets')
      .returning('*')
  )[0]
