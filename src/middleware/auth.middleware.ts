/* eslint-disable no-unused-vars */
// @packages
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

dotenv.config()

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN as string, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403)
      }

      req.user = user
      next()
    })
  } else {
    res.sendStatus(401)
  }
}
export default authenticateJWT
