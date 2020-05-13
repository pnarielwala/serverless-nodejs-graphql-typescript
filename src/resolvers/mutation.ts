import faker from 'faker'

export const createUser = (args: { input: { Name: string; Posts: any[] } }) => {
  return {
    UUID: faker.random.uuid(),
    Name: args.input.Name,
    Posts: args.input.Posts,
  }
}
