// @packages
import mongoose, { Schema } from 'mongoose'

// @interfaces
import { IDeposit } from '../interfaces'

const depositSchema: Schema = new Schema({
  Time: String,
  transaction_id: Number,
  Email: String,
  Amount: String,
  'Net Amount': Number,
  Currency: String,
  Status: String,
  'Payment Gateway': String
})

const Deposit = mongoose.model<IDeposit>('Deposit', depositSchema)

export default Deposit
