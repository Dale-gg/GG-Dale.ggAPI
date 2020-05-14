import { Request, Response, NextFunction } from 'express'
import Summoner from '../Models/Summoner'
import { getRepository } from 'typeorm'

class SummonerFounder {
  public async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const { region, summonerName } = request.query
    const summonerRepository = getRepository(Summoner)

    const summoner = await summonerRepository.findOne({
      where: `"summoner_name" ILIKE '%${summonerName}%' AND "region" = '${region}'`,
    })

    if (summoner) {
      return response.redirect(
        `${process.env.APP_PREFIX}/summoners?region=${region}&summonerName=${summonerName}`,
      )
    }

    return next()
  }
}

export default SummonerFounder
