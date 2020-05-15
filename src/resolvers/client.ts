import knex from 'knex'

import { convertToCamel } from '../utils'

const client = knex({
  client: 'postgres',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  postProcessResponse: (result, queryContext) => {
    // TODO: add special case for raw results (depends on dialect)
    if (Array.isArray(result)) {
      return result.map((row) => convertToCamel(row))
    } else {
      return convertToCamel(result)
    }
  },
})

export default client
