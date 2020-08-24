import { EntityRepository, Repository, createQueryBuilder } from 'typeorm'
import { Regions } from '@dale-gg/zedjs/build/constants'

import Summoner from '../Models/Summoner'
import AppError from '../Errors/AppError'

@EntityRepository(Summoner)
class SummonerRepository extends Repository<Summoner> {
  public async getByName(
    summonerName: string,
    region: Regions,
    matchLimit = 100,
  ): Promise<Summoner> {
    const summoner = await createQueryBuilder(Summoner, 'summoner')
      .where(
        `summoner.summoner_name = :summonerName AND summoner.region = :region`,
        { summonerName: summonerName, region: region },
      )
      .leftJoinAndSelect('summoner.tiers', 'tier')
      .leftJoinAndSelect('summoner.matchs', 'match')
      .limit(matchLimit)
      .leftJoinAndSelect('match.champion', 'champion')
      .leftJoinAndSelect('match.participants', 'participant')
      .addOrderBy('match.timestamp', 'DESC')
      .addOrderBy('participant.participant_api_id', 'ASC')
      .getOne()

    if (!summoner) {
      throw new AppError('Summoner not found in database')
    }

    return summoner
  }
}

export default SummonerRepository
