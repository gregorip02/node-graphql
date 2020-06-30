import { ApolloServer } from 'apollo-server-express'
import { Types, Resolvers } from '../schema'

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
export const server = new ApolloServer({
  typeDefs: Types,
  resolvers: Resolvers
})

// TODO: Use apollo-server-express for apply middlewares like sessions.
// server.applyMiddleware((req, res, next) => {
//
// })

export default server
