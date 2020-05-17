import 'reflect-metadata'

import express, { Application } from 'express'
import 'express-async-errors'

import createConnection from './Database'
import Handler from './handler.app'

import IApp from './Interfaces/IApp'

class App implements IApp {
  public app: Application
  private port: number
  private database: boolean
  private routes: []

  constructor(appConfig: { port: any; routes: any; database: boolean }) {
    this.app = express()
    this.port = appConfig.port
    this.database = appConfig.database
    this.routes = appConfig.routes
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

  private eHandler(): void {
    const handler = new Handler()
    this.app.use(handler.createHandler)
  }
}

export default App
