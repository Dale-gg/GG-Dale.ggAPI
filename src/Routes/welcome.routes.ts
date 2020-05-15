import { Router, Request, Response } from 'express'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
  return response.json({
    project: process.env.APP_NAME,
    prefix: process.env.APP_PREFIX,
    welcome: 'Welcome to Dale.gg DevAPI',
    repository: {
      openSource: 'This is a open source project by Dale.gg Organization!',
      repository: 'https://github.com/Dale-gg/GG-Dale.ggAPI',
    },
    endpoints: {
      whereFind: 'You can find all endpoints in our Github repository',
      quickExample: {
        Summoner: {
          POST:
            'https://dalegg-api.herokuapp.com/gg/v1/summoners?region=br1&summonerName=iLenon7',
          GET:
            'https://dalegg-api.herokuapp.com/gg/v1/summoners?region=br1&summonerName=iLenon7',
        },
      },
    },
    withLove: {
      contributor1: {
        nickname: 'jlenon7',
        repository: 'https://github.com/jlenon7',
      },
      contributor2: {
        nickname: 'Adryell',
        repository: 'https://github.com/Adryell',
      },
    },
  })
})

export default routes
