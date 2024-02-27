// @packages
import express from 'express'

// @scripts
import login from './login.routes'
import clients from './clients.routes'
import deposits from './deposits.routes'
import withdrawals from './withdrawals.routes'
import balance from './balance.routes'
import sales from './sales.routes'
import brokers from './brokers.routes'
// import authenticateJWT from '../middleware/auth.middleware'

const router = express.Router()

const routerApi = (app: express.Application) => {
  app.use('/api', router)

  router.use('/login', login)
  router.use('/clients', clients)
  router.use('/deposits', deposits)
  router.use('/withdrawals', withdrawals)
  router.use('/balance', balance)
  router.use('/sales', sales)
  router.use('/brokers', brokers)
}

export default routerApi
