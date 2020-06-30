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

UserSchema.pre('save', () => {
  // TODO: Hash user password with bcrypt.js
  console.log('Pre-saving user in db')
})

UserSchema.methods.toJSON = function () {
  return {
    email: this.email
  }
}

const User = model('User', UserSchema)

export default User
