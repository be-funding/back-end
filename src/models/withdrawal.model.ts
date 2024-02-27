// @packages
import mongoose, { Schema } from 'mongoose'

// @interfaces
import { IWithdrawal } from '../interfaces'

const withdrawalSchema: Schema = new Schema({
  Time: String,
  transaction_id: String,
  Email: String,
  Amount: Number,
  'Net Amount': Number,
  Currency: String,
  Status: String,
  'Payment Gateway': String
})

const Withdrawal = mongoose.model<IWithdrawal>('Withdrawal', withdrawalSchema)

export default Withdrawal
