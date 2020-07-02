// GraphQL middlewares for resolvers.
export const guardMiddleware = (_, context) => {
  if (context.req.session.uid) {
    throw Error('You are already logged in')
  }

  return true
}

export const authMiddleware = (_, context) => {
  if (!context.req.session.uid) {
    throw Error('You are not logged in')
  }

  return true
}

export default {
  guardMiddleware,
  authMiddleware
}
