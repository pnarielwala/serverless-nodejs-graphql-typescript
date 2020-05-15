import { getUser, getUserTweets } from './query'
import { createUser, createTweet } from './mutation'

const resolvers = {
  Query: {
    getUser,
    getUserTweets,
  },
  Mutation: {
    createUser,
    createTweet,
  },
}

export default resolvers
