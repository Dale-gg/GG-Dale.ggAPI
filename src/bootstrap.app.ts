import 'reflect-metadata'

import express, {
  Request,
  Response,
  NextFunction,
  Application,
  Router,
} from 'express'
import 'express-async-errors'

import AppError from './App/Errors/AppError'

import createConnection from './Database'

import IApp from './@types/IApp'

class App implements IApp {
  public app: Application
  public port: number
  public database: boolean
  public routes: []
  public router: Router

  constructor(appConfig: { routes: any; port: any; database: boolean }) {
    this.app = express()
    this.port = appConfig.port
    this.router = Router()
    this.routes = appConfig.routes
    this.database = appConfig.database
    this.eHandler()
  }

  public createApp(): void {
    this.app.use(express.json())
    this.router.use(this.routes)
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

  private eHandler(): void {
    this.app.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
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
      },
    )
  }
}

export default App
