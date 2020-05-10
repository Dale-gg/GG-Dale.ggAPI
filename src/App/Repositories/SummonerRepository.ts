import { EntityRepository, Repository } from 'typeorm';
import { Regions } from "@jlenon7/zedjs/dist/constants"

import Summoner from '../Models/Summoner';
import AppError from '../Errors/AppError';

@EntityRepository(Summoner)
class SummonerRepository extends Repository<Summoner> {
  public async getByName(summonerName: string, region: Regions): Promise<Summoner> {
    const summoner = await this.findOne({
      where: { region, summoner_name: summonerName}
    })

    if (!summoner) {
      throw new AppError('Summoner not found in database, I really dont know how you get here!')
    }

    return summoner
  }
}

export default SummonerRepository;
