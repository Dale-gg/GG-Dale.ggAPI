import { Router } from 'express'

import SummonerController from '../App/Controllers/Summoners/SummonerController'
import SummonerFounder from '../App/Middlewares/SummonerFounder'

const summonerRouter = Router()

const Controller = new SummonerController()
const Founder = new SummonerFounder()

summonerRouter.get('/', Controller.show)
summonerRouter.post('/', Founder.handle, Controller.store)
summonerRouter.put('/:id', Controller.update)

export default summonerRouter
