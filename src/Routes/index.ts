import { Router } from 'express'

import summoners from './summoners.routes'

const routes = Router()

routes.use(`${process.env.APP_PREFIX}/summoners`, summoners)

export default routes
