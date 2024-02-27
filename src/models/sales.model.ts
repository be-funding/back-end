// @packages
import mongoose, { Schema } from 'mongoose'

// @interfaces
import { ISale } from '../interfaces'

const SalesSchema: Schema = new Schema({
  Login: String,
  Email: String,
  'Transaction Time': String,
  Amount: Number,
  Currency: String,
  'Payment Method': String,
  'Codigo Bono': String,
  Descuento: String
})

const Sale = mongoose.model<ISale[]>('Sales', SalesSchema)

export default Sale
