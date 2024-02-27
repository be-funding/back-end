// @packages
import express, { Application, Request, Response } from 'express'
import cors from 'cors'

// @scripts
import connectDB from './db'
import routerApi from './routes'

const app: Application = express()
const port = 8080

connectDB()

app.use(express.json())
app.use(cors())

routerApi(app)

app.get('/', (_: Request, res: Response) => {
  res.status(200).send('Hello from Express')
})

app.listen(port, () => console.log(`Server is listening on port ${port}!`))
