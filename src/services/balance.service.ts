// @scripts
import Deposit from '../models/deposit.model'
import Withdrawal from '../models/withdrawal.model'

// @interfaces
import { IDeposit, IWithdrawal } from 'interfaces'

class BalanceService {
  async find () {
    const deposits: IDeposit[] = await Deposit.find()
    const withdrawals: IWithdrawal[] = await Withdrawal.find()

    const depositsSum: number = deposits.reduce((acc, w) => acc + Number(w['Net Amount']), 0)
    const withdrawalsSum: number = withdrawals.reduce((acc, w) => acc + Number(w['Net Amount']), 0)

    const balance: number = depositsSum - withdrawalsSum

    return balance
  }
}

export default BalanceService
