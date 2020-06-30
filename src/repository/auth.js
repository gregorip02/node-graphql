import User from '../models/user'

export const register = async (_, { input: { email, password } }) => {
  if (await User.findOne({ email })) {
    throw Error('User already exists')
  }

  // Return authenticated user ;)
  return await login(null, {
    input: await User.create({ email, password }),
    registered: true
  }, true)
}

export const login = async (_, { input: { email, password }, registered = false }) => {
  if (!registered && !await User.findOne({ email })) {
    // Social engineering here.
    throw Error('Incorrect email or password')
  }

  // TODO: Check password hash
  // bla, bla, bla...

  // TODO: Generate token or server-side session
  // bla, bla, bla...

  return {
    user: { email },
    token: 'INDFKJDFNSDF.SDFKJSDKFSDFKSD.SDJKFNSDJKFDF'
  }
}
