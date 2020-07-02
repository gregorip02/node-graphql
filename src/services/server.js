import { ApolloServer } from 'apollo-server-express'
import { Types, Resolvers } from '../schema'

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
export const configure = (serverOptions = {}) =>
  new ApolloServer(Object.assign({}, {
    typeDefs: Types,
    resolvers: Resolvers,
  }, serverOptions))

export default {
  configure
}
