
// @scripts
import Deposit from '../models/deposit.model'

// @interfaces
import { IDeposit } from '../interfaces'

class DepositsService {
  async find () {
    const deposits = await Deposit.find()

    return deposits
  }

  async createMany (deposits: IDeposit[]): Promise<IDeposit[]> {
    const createdDeposits = await Deposit.insertMany(deposits)

    return createdDeposits
  }
}

export default DepositsService
