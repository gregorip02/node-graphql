import authMiddlewares from './auth'

export const pipe = (post, args, context, info, middlewares, onFinish) => {
  middlewares.forEach((middlewareHandler) => {
    if (! middlewareHandler(args, context, post, info)) {
      throw Error('Error handling middleware\n')
    }
  })

  return onFinish(post, args, context, info)
}

export default {
  pipe,
  ...authMiddlewares
}
