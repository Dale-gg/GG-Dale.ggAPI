import { Router } from 'express'

import summoners from './summoners.routes'

export default class Routes {
  public router = Router()
  public path = process.env.APP_PREFIX

  constructor() {
    this.setupRoutes()
  }

  public setupRoutes(): any {
    this.router.use(`${this.path}/summoners`, summoners)
  }
}
