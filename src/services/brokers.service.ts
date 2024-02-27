
// @scripts
import Broker from '../models/broker.model'

// @interfaces
import { IBroker } from 'interfaces'

class BrokersService {
  async find () {
    const brokers = await Broker.find()

    return brokers
  }

  async createMany (brokers: IBroker[]): Promise<IBroker[]> {
    const createdBrokers = await Broker.insertMany(brokers)

    return createdBrokers
  }
}

export default BrokersService
