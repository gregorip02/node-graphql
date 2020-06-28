import { ApolloServer } from 'apollo-server';
import { Types, Resolvers } from './schema.js';
import mongoose from 'mongoose';

// Mongoose database connection
(async () => {
  const {
    MONGODB_USERNAME,
    MONGODB_PASSWORD,
    MONGODB_DATABASE,
    MONGODB_LINK
  } = process.env;

  mongoose.connection.on('connecting', () => {
    console.info('⏲ Connecting with MongoDB');
  });

  await mongoose.connect(`mongodb://${MONGODB_LINK}/${MONGODB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: MONGODB_USERNAME,
    pass: MONGODB_PASSWORD
  });
})();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs: Types, resolvers: Resolvers });

const port = process.env.PORT || 4000;

mongoose.connection.on('error', (err) => {
  console.error('Error connecting with MongoDB', err);
  process.exit(1);
});

mongoose.connection.on('connected', () => {
  console.info('😁 Connected with MongoDB.');
  // The `listen` method launches a web server.
  server.listen({ port }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
    // The external port represent the port exposed by docker container.
    // Here is where the app is exposed to the "world".
    if (process.env.EXTERNAL_PORT) {
      const externalUrl = url.replace(port, process.env.EXTERNAL_PORT)
      console.log(`📤 Exposing at ${externalUrl}`)
    }
  });
});
