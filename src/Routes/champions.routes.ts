import { Router } from 'express'

import StoreValidate from '../App/Validators/Champion/StoreChampion'
import UpdateValidate from '../App/Validators/Champion/UpdateChampion'
import ChampionController from '../App/Controllers/DDragon/ChampionController'

const routes = Router()

const Controller = new ChampionController()

// routes.post('/script/all', Controller.storeAll)
// routes.put('/script/all', Controller.updateAll)
routes.post('/', StoreValidate, Controller.store)
routes.put('/:key', UpdateValidate, Controller.update)

export default routes
