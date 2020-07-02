import mongo from './services/mongo'
import graphql from './services/server'
import session from './services/session'
import express from 'express'
import cors from 'cors'

const app = express()

const port = process.env.PORT || 3000
const host = process.env.HOST || '0.0.0.0'

// Configure cors
app.use(cors({
  origin: `http://${host}:${port}`,
  optionsSuccessStatus: 200,
  credentials: true
}))

// trust first proxy
process.env.NODE_ENV === 'production' ? app.set('trust proxy', 1) : null
session.configure(app, {
  // Replace default session configurations here.
})

// For healthchecks or some like that.
app.get('/', (_, res) => {
  res.json({ message: 'It works!' })
})

// Configure graphql server and pass express request
// as context for server side session managment.
const apolloServer = graphql.configure({
  context: ({ req, res }) => ({ req, res })
})

apolloServer.applyMiddleware({
  app,
  cors: process.env.NODE_ENV === 'production'
})

// Handle every http route with 404.
app.use('*', (_, res) => {
  res.status(404).json({ error: 'Page not found' })
})

mongo.connect().then(async () => {
  // Start http and graphql server
  await app.listen({ port, host }, () => {
    const url = `http://${host}:${port}`;

    console.info(`🚀 HTTP Server listening on ${url}`)
    console.info(`🚀 GraphQL Server ready on ${url}${apolloServer.graphqlPath}`)
  })
})
