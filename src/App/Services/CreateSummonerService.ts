import { getRepository } from 'typeorm'
import Summoner from '../Models/Summoner'
import { LolApi } from '@jlenon7/zedjs/dist'
import { Regions } from '@jlenon7/zedjs/dist/constants'

class CreateSummonerService {
  public async execute(
    summonerName: string,
    region: Regions,
  ): Promise<Summoner> {
    const api = new LolApi()
    const repository = getRepository(Summoner)

    const { response: S } = await api.Summoner.getByName(summonerName, region)

    const summoner = repository.create({
      summoner_id: S.id,
      account_id: S.accountId,
      puuid: S.puuid,
      summoner_name: S.name,
      profile_icon: S.profileIconId,
      revision_date: S.revisionDate,
      summoner_level: S.summonerLevel,
      region,
    })

    await repository.save(summoner)

    return summoner
  }
}

export default CreateSummonerService
