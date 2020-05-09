import { Request, Response } from 'express'
import CreateSummonerService from "../../Services/CreateSummonerService";

interface IRequest {
  region?: string
  summonerName?: string
}

class SummonerController {
  public async store(request: Request, response: Response): Promise<object> {
    const create = new CreateSummonerService()
    const { region, summonerName }: IRequest =  request.query

    const summoner = await create.execute({ region, summonerName })

    return response.json({ summoner })
  }

  public async show(): Promise<void> {
    console.log('I entered in show')
  }

  public async update(): Promise<void> {}
}

export default SummonerController;
