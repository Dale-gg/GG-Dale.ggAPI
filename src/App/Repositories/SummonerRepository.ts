import { EntityRepository, Repository, getRepository } from 'typeorm'
import { Regions } from '@jlenon7/zedjs/dist/constants'

import Summoner from '../Models/Summoner'
import AppError from '../Errors/AppError'

@EntityRepository(Summoner)
class SummonerRepository extends Repository<Summoner> {
  public async getByName(
    summonerName: string,
    region: Regions,
  ): Promise<Summoner> {
    const repository = getRepository(Summoner)

    const summoner = await repository.findOne({
      where: {
        region: region,
        summoner_name: summonerName,
      },
    })

    if (!summoner) {
      throw new AppError('Summoner not found in database')
    }

    return summoner
  }
}

export default SummonerRepository
