// @scripts
import Sale from '../models/sales.model'

// @interfaces
import { ISale } from '../interfaces'

class SalesService {
  async find () {
    const sales = await Sale.find()

    return sales
  }

  async createMany (sales: ISale[]): Promise<ISale[]> {
    const createdSales = await Sale.insertMany(sales)

    return createdSales
  }
}

export default SalesService
