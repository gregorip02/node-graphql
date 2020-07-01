import User from '../models/user'

export const register = async (_, { input: { email, password } }) => {
  if (await User.findOne({ email })) {
    throw Error('User already exists')
  }

  // Return authenticated user ;)
  return await login(null, {
    input: await User.create({ email, password }),
  })
}

export const login = async (_, { input: { email, password } }) => {
  const user = await User.findOne({ email })

  if (! user || ! user.checkHash(password)) {
    // Social engineering here.
    throw Error('Incorrect email or password')
  }

  // TODO: Generate token and server-side session
  // bla, bla, bla...

  return {
    user: { email },
    token: 'INDFKJDFNSDF.SDFKJSDKFSDFKSD.SDJKFNSDJKFDF'
  }
}
