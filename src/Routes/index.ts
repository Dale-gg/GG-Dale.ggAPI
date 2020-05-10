import { Router } from 'express'

import summoners from './summoners.routes'

const routes = Router()

routes.use('/gg/v1/summoners', summoners)

export default routes
