import { Router } from 'express'

import RuneController from '../App/Controllers/DDragon/RuneController'

const routes = Router()

const Controller = new RuneController()

routes.post('/script/all', Controller.storeAll)
// routes.put('/script/all', Controller.updateAll)

export default routes
