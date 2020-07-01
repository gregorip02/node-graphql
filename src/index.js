import mongo from './services/mongo'
import graphql from './services/server'
import session from './services/session'
import express from 'express'

const app = express()

const port = process.env.PORT || 3000
const host = process.env.HOST || '0.0.0.0'

session.configure(app, {
  // Replace default session configurations here.
})

// For healthchecks or some like that.
app.get('/', (_, res) => {
  res.json({
    message: 'It works!'
  })
})

graphql.applyMiddleware({ app })

// Handle every http route with 404.
app.use('*', (_, res) => {
  res.status(404).json({
    error: 'Page not found'
  })
})

mongo.connect().then(async () => {
  // Start http and graphql server
  await app.listen({ port, host }, () => {
    const url = `http://${host}:${port}`;

    console.info(`🚀 HTTP Server listening on ${url}`)
    console.info(`🚀 GraphQL Server ready on ${url}${graphql.graphqlPath}`)
  })
})
