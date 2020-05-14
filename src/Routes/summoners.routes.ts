import { Router } from 'express'

import ShowValidate from '../App/Validators/Summoner/ShowSummoner'
import StoreValidate from '../App/Validators/Summoner/StoreSummoner'
import UpdateValidate from '../App/Validators/Summoner/UpdateSummoner'

import SummonerFounder from '../App/Middlewares/SummonerFounder'
import SummonerController from '../App/Controllers/Summoners/SummonerController'

const routes = Router()

const Founder = new SummonerFounder()
const Controller = new SummonerController()

routes.get('/', ShowValidate, Controller.show)
routes.put('/:id', UpdateValidate, Controller.update)
routes.post('/', StoreValidate, Founder.handle, Controller.store)

export default routes
