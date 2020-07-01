import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new Schema({
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
}, { timestamps: true })

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    // Hash user password before store it.
    let salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
  }

  next()
})

// To excluded sensible attributes for json responses
UserSchema.methods.toJSON = function () {
  return {
    email: this.email
  }
}

// Check user plain text password with hashed password
UserSchema.methods.checkHash = function (plainTextPassword) {
  return bcrypt.compareSync(plainTextPassword, this.password)
}

const User = model('User', UserSchema)

export default User
