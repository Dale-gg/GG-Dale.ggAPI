import { Router } from 'express'

import summoners from './summoners.routes'
import champions from './champions.routes'
import welcome from './welcome.routes'
import runes from './runes.routes'

export default class Routes {
  public router = Router()
  public path = process.env.APP_PREFIX

  constructor() {
    this.setupRoutes()
  }

  public setupRoutes(): any {
    this.router.use(`${this.path}/summoners`, summoners)
    this.router.use(`${this.path}/champions`, champions)
    this.router.use(`${this.path}/runes`, runes)
    this.router.use(`${this.path}/welcome`, welcome)
    this.router.use(`${this.path}`, welcome)
  }
}
