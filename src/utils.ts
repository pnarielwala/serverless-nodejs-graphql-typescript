import camelCase from 'camelcase'
import { snakeCase } from 'snake-case'

export const convertToCamel = (obj: Object) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [camelCase(key)]: value,
    }
  }, {})
}

export const convertToSnake = (obj: Object) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [snakeCase(key)]: value,
    }
  }, {})
}
