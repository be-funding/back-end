// @packages
import express, { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// @scripts
import UserService from '../services/login.service'

dotenv.config()

const router = express.Router()
const service = new UserService()

router.post('/', async (req: Request, res: Response) => {
  const { username, password } = req.body

  try {
    const user = await service.findOne(username)

    if (!user) return res.status(401).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password as string)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ username: user.username }, process.env.SECRET_TOKEN as string)

    res.json({ token })
  } catch (error) {
    return res.status(500).send('Internal Server Error')
  }
})

export default router
