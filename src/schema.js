import { gql } from 'apollo-server'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed
// against your data.
export const Types = gql`
  type User {
    email: String!
  }

  input createUserInput {
    email: String!
  }

  type Query {
    users: [User!]
  }

  type Mutation {
    createUser(email: String!): User!
  }
`

// Resolvers define the technique for fetching the types defined
// in the schema. This resolver retrieves books from the "books"
// array above.
export const Resolvers = {
  Query: {
    users: async () => {
      return []
    }
  },
  Mutation: {
    createUser: async (_, { email }) => {
      console.log(email)
      return {
        email
      }
    }
  }
}
