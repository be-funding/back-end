// @packages
import mongoose, { Schema } from 'mongoose'

const SalesSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

const User = mongoose.model('Users', SalesSchema)

export default User
