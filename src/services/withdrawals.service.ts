
// @scripts
import Withdrawal from '../models/withdrawal.model'

// @interfaces
import { IWithdrawal } from '../interfaces'

class WithdrawalsService {
  withdrawal: IWithdrawal[]

  constructor () {
    this.withdrawal = []
  };

  async find () {
    const withdrawal = await Withdrawal.find()

    return withdrawal
  }

  async createMany (withdrawals: IWithdrawal[]): Promise<IWithdrawal[]> {
    const createdWithdrawals = await Withdrawal.insertMany(withdrawals)

    return createdWithdrawals
  }
}

export default WithdrawalsService
