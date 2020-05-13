import faker from 'faker'

export const getUser = (args: { uuid: string }) => {
  return {
    UUID: faker.random.uuid(),
    Name: faker.name.firstName(),
    Posts: [],
  }
}
