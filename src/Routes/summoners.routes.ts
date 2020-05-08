import { Router } from 'express'

import SummonerController from '../Controllers/Summoners/SummonerController'
import SummonerFounder from '../Middlewares/SummonerFounder'

const summonerRouter = Router()
const Controller = new SummonerController()
const Founder = new SummonerFounder()

summonerRouter.get('/', Controller.show)
summonerRouter.post('/', Founder.handle, Controller.store)
summonerRouter.put('/', Controller.update)

export default summonerRouter
