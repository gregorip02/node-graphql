import User from '../models/user'
import middlewares, { pipe } from '../middlewares'

const incrementLoginAttempts = (req) => {
  req.session.loginAttempts = req.session.loginAttempts + 1
}

const storeSession = (req, user) => {
  req.session.uid = user.id
  req.session.loginAttempts = 0
}

const removeSession = (req, res) => {
  let sid = process.env.SESSION_NAME || 'app.sid'
  req.session.destroy(sid)
  res.clearCookie(sid)
}

export const register = (post, args, context, info) => pipe(post, args, context, info, [
  middlewares.guardMiddleware
], async (_, { input }, { req }) => {
  if (await User.findOne({ email: input.email })) {
    throw Error('User already exists')
  }

  const user = await User.create({ email: input.email, password: input.password })
  storeSession(req, user)

  return {
    user, token: 'TODO: add jwt compatibility'
  }
})

export const login = (post, args, context, info) => pipe(post, args, context, info, [
  middlewares.guardMiddleware
], async (_, { input }, { req }) => {
  const user = await User.findOne({ email: input.email })

  if (! user || ! user.checkHash(input.password)) {
    // Social engineering here.
    incrementLoginAttempts(req)
    throw Error('Incorrect email or password')
  }

  storeSession(req, user)

  return {
    user, token: 'TODO: add jwt compatibility'
  }
})

export const logout = (post, args, context, info) => pipe(post, args, context, info, [
  middlewares.authMiddleware
], (_, __, { req, res }) => removeSession(req, res))
