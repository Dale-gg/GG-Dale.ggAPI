import { Request, Response } from 'express'
import { SecResponse } from '@jlenon7/dedsec/build/Responses'
import CreateSummonerService from '../../Services/CreateSummonerService'
import SummonerRepository from '../../Repositories/SummonerRepository'

const dedSec = new SecResponse()

class SummonerController {
  public async store(request: Request, response: Response): Promise<object> {
    const create = new CreateSummonerService()
    const { region, summonerName }: any =  request.query

    const summoner = await create.execute(summonerName, region)

    const res = dedSec.withOne(summoner, 'Summoner founded')
    return response.json(res)
  }

  public async show(request: Request, response: Response): Promise<object>  {
    const repository = new SummonerRepository()
    const { region, summonerName }: any = request.query

    const summoner = await repository.getByName(summonerName, region)

    const res = dedSec.withOne(summoner, 'Summoner founded')
    return response.json(res)
  }

  public async update(): Promise<void> {}
}

export default SummonerController;
