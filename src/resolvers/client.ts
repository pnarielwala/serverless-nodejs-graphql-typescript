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
    if (Array.isArray(result)) {
      return result.map((row) => convertToCamel(row))
    } else if (typeof result === 'object') {
      return convertToCamel(result)
    } else {
      return result
    }
  },
})

export default client
