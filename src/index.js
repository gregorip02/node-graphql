import mongo from './services/mongo'
import server from './services/server'

mongo.connect().then(() => {
  console.info('😁 Connected with MongoDB')

  // Starting graphql server
  server.listen({ port: process.env.PORT || 3000 }).then(({ url, port }) => {
    console.info(`🚀 Server ready at ${url}`)

    // The external port represent the port exposed by docker container.
    // Here is where the app is exposed to the "world".
    if (process.env.EXTERNAL_PORT) {
      const externalUrl = url.replace(port, process.env.EXTERNAL_PORT)
      console.info(`📤 Exposing at ${externalUrl}`)
    }
  })
})
