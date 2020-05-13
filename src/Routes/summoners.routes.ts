import { Router } from 'express'

import ShowValidate from '../App/Validators/ShowSummoner'
import StoreValidate from '../App/Validators/StoreSummoner'
import UpdateValidate from '../App/Validators/UpdateSummoner'

import SummonerFounder from '../App/Middlewares/SummonerFounder'
import SummonerController from '../App/Controllers/Summoners/SummonerController'

const routes = Router()

const Founder = new SummonerFounder()
const Controller = new SummonerController()

routes.get('/', ShowValidate, Controller.show)
routes.put('/:id', UpdateValidate, Controller.update)
routes.post('/', StoreValidate, Founder.handle, Controller.store)

export default routes
