const path = require('path');
const { ApolloServer } = require('apollo-server');
const { Types, Resolvers } = require('./schema.js');

// Load .env configuration from "secret" file.
require('dotenv').config({
  path: path.resolve('..', '.env')
});

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs: Types, resolvers: Resolvers });

const port = process.env.PORT || 4000

// The `listen` method launches a web server.
server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);

  if (process.env.EXTERNAL_PORT) {
    const externalUrl = url.replace(port, process.env.EXTERNAL_PORT);

    console.log(`📤 Exposing at ${externalUrl}`);
  }
});
