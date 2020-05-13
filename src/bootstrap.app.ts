import 'reflect-metadata'

import express, { Request, Response, NextFunction, Application } from 'express'
import { SecResponse } from '@jlenon7/dedsec/build/Responses'
import 'express-async-errors'

import AppError from './App/Errors/AppError'
import createConnection from './Database'

import IApp from './@types/IApp'

class App implements IApp {
  public app: Application
  public port: number
  public database: boolean
  public routes: []
  public dedsec: SecResponse

  constructor(appConfig: { port: any; routes: any; database: boolean }) {
    this.app = express()
    this.port = appConfig.port
    this.database = appConfig.database
    this.routes = appConfig.routes
    this.dedsec = new SecResponse()
    this.createApp()
    this.eHandler()
  }

  public createApp(): void {
    this.app.use(express.json())
    this.app.use(this.routes)
    this.database ? this.createDatabase() : this.mochaDb()
    this.app.listen(this.port, () =>
      process.env.NODE_ENV === 'testing'
        ? console.log(`🤓 Dale.gg started testing on port ${this.port}! 🧙‍♂️`)
        : console.log(`🚀 Dale.gg started on port ${this.port}! 🤯`),
    )
  }

  private createDatabase(): void {
    createConnection()
  }

  private mochaDb(): void {
    console.log('Mocking database for unit tests! 🤯')
  }

  public eHandler(): void {
    this.app.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          const res = this.dedsec.withError(
            err.dataObj,
            err.message,
            err.name,
            err.statusCode,
          )

          return response.status(err.statusCode).json(res)
        }

        if (
          process.env.NODE_ENV === 'testing' ||
          process.env.NODE_ENV === 'development'
        ) {
          const res = this.dedsec.withError({}, err.message)

          return response.status(500).json(res)
        }

        return response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        })
      },
    )
  }
}

export default App
