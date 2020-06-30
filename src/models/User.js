import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
})

UserSchema.pre('save', function () {
  console.log('Pre-saving user in db')
})

const User = model('User', UserSchema)

export default User
