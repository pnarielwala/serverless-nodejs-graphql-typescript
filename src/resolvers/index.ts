import { getUser } from './query'
import { createUser } from './mutation'
import { Context, APIGatewayEvent } from 'aws-lambda'
import { IDelegateToSchemaOptions } from 'apollo-server-lambda'

const resolvers = {
  Query: {
    getUser: (_: {} | undefined, args: { uuid: string }) => getUser(args),
  },
  Mutation: {
    createUser: (_, args: { input: { Name: string; Posts: any[] } }) => {
      return createUser(args)
    },
  },
}

export default resolvers
