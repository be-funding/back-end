// @packages
import express, { Request, Response } from 'express'

// @scripts
import BalanceService from '../services/balance.service'

const router = express.Router()
const service = new BalanceService()

router.get('/', async (_: Request, res: Response) => {
  try {
    const balance: number = await service.find()

    if (balance >= 0 || balance <= 0) return res.status(200).json(balance)
    else return res.status(404).send('Error getting balance')
  } catch (error) {
    return res.status(500).send('Internal Server Error')
  }
})

export default router
