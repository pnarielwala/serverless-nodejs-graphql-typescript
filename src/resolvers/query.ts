import faker from 'faker'
import client from './client'

export const getUser = async (_: any, args: { email: string }) => {
  return await client('Users').select().where('email', args.email).first()
}

export const getUserTweets = async (_: any, args: { id: number }) =>
  await client('Tweets').select().where('user_id', args.id)
