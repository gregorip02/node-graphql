import redis from 'redis'
import connect from 'connect-redis'
import session from 'express-session'

// Create a redis client based on environment
const client = redis.createClient({
  host: process.env.REDIS_HOST || '0.0.0.0',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || 'keyboard cat'
})

// Handle client errors
client.on('error', (err) => {
  console.log('Error connecting with redis server\n', err)
  process.exit(1)
})

// Use redis has session store manager
const RedisStore = connect(session)
const store = new RedisStore({ client })

export const configure = (expressApplication, sessionConfig = {}) => {
  const baseSessionConfig = Object.assign({}, {
    store,
    rolling: true,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    cookie: {
      sameSite: true,
      maxAge: 1000 * 60 * 10,
      name: process.env.SESSION_NAME || 'app.sid',
      secure: process.env.NODE_ENV === 'production',
    }
  }, sessionConfig)

  expressApplication.use(session(baseSessionConfig))
}

export default {
  configure
}
