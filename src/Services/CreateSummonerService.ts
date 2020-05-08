import { getRepository } from "typeorm"
import Summoner from "../Models/Summoner"

interface IRequest {
  region?: string
  summonerName?: string
}

class CreateSummonerService {
  public async execute({ region, summonerName }: IRequest): Promise<Summoner> {
    const repository = getRepository(Summoner)

    const summoner = repository.create({
      account_id: '1231321321',
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
