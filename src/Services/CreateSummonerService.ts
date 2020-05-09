import { getRepository } from "typeorm"
import Summoner from "../Models/Summoner"
import { LolApi } from '@jlenon7/zedjs/dist'

interface IRequest {
  region: any
  summonerName: string
}

class CreateSummonerService {
  public async execute({ region, summonerName }: IRequest): Promise<Summoner> {
    const api = new LolApi()
    const repository = getRepository(Summoner)

    const S = await api.Summoner.getByName(summonerName, region)

    const summoner = repository.create({
      account_id: S.accountId,
      summoner_id: '123132321321',
      puuid: '95256456-9077-11ea-bb37-0242ac130002',
      revision_date: '213213231321',
      region,
      summoner_name: summonerName,
    })

    await repository.save(summoner)

    return summoner
  }
}

export default CreateSummonerService
