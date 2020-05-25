import { Request, Response } from 'express'
import { SecResponse } from '@jlenon7/dedsec/build/Responses'
import CreateSummonerService from '../../Services/Summoner/CreateSummonerService'
import UpdateSummonerService from '../../Services/Summoner/UpdateSummonerService'
import SummonerRepository from '../../Repositories/SummonerRepository'
import TierService from '../../Services/Observers/TierService'
import MatchService from '../../Services/Observers/MatchService'

const dedSec = new SecResponse()
const create = new CreateSummonerService()
const update = new UpdateSummonerService()

class SummonerController {
  public async store(request: Request, response: Response): Promise<object> {
    const { region, summonerName, withTiers, withMatchs }: any = request.query

    if (withTiers === true) {
      new TierService(create)
    }

    if (withMatchs === true) {
      new MatchService(create)
    }

    const summoner = await create.execute(summonerName, region)

    const res = dedSec.withOne(summoner, 'Summoner registered')
    return response.json(res)
  }

  public async show(request: Request, response: Response): Promise<object> {
    const repository = new SummonerRepository()
    const { region, summonerName, matchLimit }: any = request.query

    const summoner = await repository.getByName(
      summonerName,
      region,
      matchLimit,
    )

    const res = dedSec.withOne(summoner, 'Summoner founded')
    return response.json(res)
  }

  public async update(request: Request, response: Response): Promise<object> {
    const { id }: any = request.params
    const { withTiers, withMatchs }: any = request.body

    if (withTiers === true) {
      new TierService(update)
    }

    if (withMatchs === true) {
      new MatchService(update)
    }

    const summoner = await update.execute(id)

    const res = dedSec.withOne(summoner, 'Summoner founded')
    return response.json(res)
  }
}

export default SummonerController
