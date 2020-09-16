import { Router, Request, Response } from 'express'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pjson = require('../../package.json')

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
