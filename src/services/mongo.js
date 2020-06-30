import mongoose from 'mongoose'

mongoose.connection.on('connecting', () => {
  console.info('⏲ Connecting with MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('Error connecting with MongoDB', err)
  process.exit(1)
})

export const connection = mongoose.connection

export const connect = async () => {
  const {
    MONGODB_USERNAME: user,
    MONGODB_PASSWORD: pass,
    MONGODB_DATABASE,
    MONGODB_LINK
  } = process.env

  // Estableciendo conexión con mongo.
  await mongoose.connect(`mongodb://${MONGODB_LINK}/${MONGODB_DATABASE}`, {
    user,
    pass,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

export default {
  connect,
  connection
}
