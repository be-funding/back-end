// @packages
import mongoose, { Schema } from 'mongoose'

// @interfaces
import { IBroker } from '../interfaces'

const brokerSchema: Schema = new Schema({
  'Registration_Date': String,
  Email: String,
  Nombre: String,
  Apellido: String,
  Currency: Number,
  Clients: Number,
  Rewards: String
})

const Broker = mongoose.model<IBroker>('Broker', brokerSchema)

export default Broker
