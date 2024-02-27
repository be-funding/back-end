/* eslint-disable no-undef */
import ClientsService from '../services/clients.service'

import { mocked } from 'jest-mock'

jest.mock('../services/clients.service')

describe('ClientsService', () => {
  describe('find', () => {
    test('should return a list of clients', async () => {
      const expectedClients = [
        {
          date: '2023-07-20',
          email: 'lelo69@yopmail.com',
          name: 'lelo',
          last_name: 'prueba',
          currency: 1,
          clients: 1
        },
        {
          date: '2023-10-24',
          email: 'kevinescobarshar@gmail.com',
          name: 'Kevin',
          last_name: 'Escobar',
          currency: 1,
          clients: 1
        }
      ]

      const clientsService = new ClientsService()

      mocked(clientsService.find).mockResolvedValue(expectedClients)

      const clients = await clientsService.find()

      expect(clients).toEqual(expectedClients)
    })
  })
})
