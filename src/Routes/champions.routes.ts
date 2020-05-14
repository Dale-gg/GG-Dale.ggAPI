import { Router } from 'express'

import ChampionController from '../App/Controllers/DDragon/ChampionController'

const routes = Router()

const Controller = new ChampionController()

routes.post('/', Controller.store)
routes.put('/script/all', Controller.updateAll)
routes.put('/:key', Controller.update)
routes.post('/script/all', Controller.storeAll)

export default routes
