import 'reflect-metadata'
import * as dotenv from 'dotenv'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import routes from './Routes'
import AppError from './App/Errors/AppError'

import createConnection from './Database'

dotenv.config()
let path
switch (process.env.NODE_ENV) {
  case 'testing':
    path = `${__dirname}/../../.env.testing`
    break
  case 'unitTesting':
    path = `${__dirname}/../../.env.testing`
    break
  default:
    path = `${__dirname}/../../.env`
}
dotenv.config({ path: path })

createConnection()
const app = express()

app.use(express.json())
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  if (
    process.env.NODE_ENV === 'testing' ||
    process.env.NODE_ENV === 'development'
  ) {
    return response.status(500).json({
      status: 'error',
      message: err.message,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

export default app
