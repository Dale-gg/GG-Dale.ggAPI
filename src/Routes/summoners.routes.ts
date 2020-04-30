import { Router } from 'express'

import SummonerController from '../Controllers/Summoners/SummonerController'

const summonerRouter = Router()
const Controller = new SummonerController()

summonerRouter.post('/:name', Controller.store)
summonerRouter.get('/:name', Controller.show)
summonerRouter.put('/:name', Controller.update)

export default summonerRouter
