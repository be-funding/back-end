// @packages
import mongoose, { Schema } from 'mongoose'

// @interfaces
import { IClient } from '../interfaces'

const clientSchema: Schema = new Schema({
  create_time: String,
  Email: String,
  Nombre: String,
  Apellidos: String,
  Status: Number,
  phone: String,
  Country: String
})

const Client = mongoose.model<IClient>('Client', clientSchema)

export default Client
