import { Router, Request, Response } from 'express'
import pjson from '../../package.json'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
  return response.json({
    prefix: '/gg/v1',
    domain: 'GG - Dale.gg',
    version: `${pjson.version}`,
    greeting: 'Welcome to Dale.gg API!',
  })
})

export default routes
