import { gql } from 'apollo-server-express'
import { login, register } from './repository/auth'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed
// against your data.
export const Types = gql`
  type User {
    email: String!
  }

  type authenticatedUser {
    user: User!
    token: String!
  }

  input createUserInput {
    email: String!
    password: String!
  }

  type Query {
    ping: String!
  }

  type Mutation {
    register(input: createUserInput!): authenticatedUser!
    login(input: createUserInput!): authenticatedUser!
  }
`

// Resolvers define the technique for fetching the types defined
// in the schema. This resolver retrieves books from the "books"
// array above.
export const Resolvers = {
  Query: {
    ping: async () => 'pong'
  },
  Mutation: {
    login, register
  }
}
