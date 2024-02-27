
// @scripts
import Client from '../models/client.model'

// @interfaces
import { IClient } from 'interfaces'

class ClientsService {
  async find () {
    const clients = await Client.find()

    return clients
  }

  async create (clientData: IClient) {
    const client = new Client(clientData)
    await client.save()

    return client
  }

  async createMany (clients: IClient[]): Promise<IClient[]> {
    const createdClients = await Client.insertMany(clients)

    return createdClients
  }
}

export default ClientsService
