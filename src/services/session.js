import redis from 'redis'
import connect from 'connect-redis'
import session from 'express-session'

// Configure redis has session store manager.
const RedisStore = connect(session)

const client = redis.createClient({
  host: process.env.REDIS_HOST || '0.0.0.0',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || 'keyboard cat'
})

// Creating redis store
const store = new RedisStore({ client })

export const configure = (expressApplication, sessionConfig = {}) => {
  const redisClientOptions = Object.assign({}, {
    store,
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || 'keyboard cat'
  }, sessionConfig)

  expressApplication.use(session(redisClientOptions))
}

export default {
  configure
}
