import authMiddlewares from './auth'

export const pipe = (post, args, context, root, middlewares, onFinish) => {
  middlewares.forEach((middlewareHandler) => {
    if (! middlewareHandler(args, context, post, root)) {
      throw Error('Error handling middleware\n')
    }
  })

  return onFinish(post, args, context, root)
}

export default {
  pipe,
  ...authMiddlewares
}
