import { Request, Response } from 'express'
import CreateSummonerService from "../../Services/CreateSummonerService";
import Summoner from '../../Models/Summoner'

interface IRequest {
  region?: string
  summonerName?: string
}

class SummonerController {
  public async store(request: Request, response: Response): Promise<any> {
    const { region, summonerName }: IRequest =  request.query
    const service = new CreateSummonerService()

    const summoner = await service.execute({ region, summonerName })

    return response.json({summoner})
  }

  public async show(): Promise<void> {
    console.log('I entered in show')
  }

  public async update(): Promise<void> {}
}

export default SummonerController;
