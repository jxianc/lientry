import { GraphQLError } from 'graphql'

const gqlErrorHandler = (gqlErrors: GraphQLError[]): string[] => {
  return gqlErrors.map((err) => err.message)
}

export { gqlErrorHandler }
