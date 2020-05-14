import { Request, Response } from 'express'
import { SecResponse } from '@jlenon7/dedsec/build/Responses'
import CreateChampionService from '../../Services/CreateChampionService'
import UpdateChampionService from '../../Services/UpdateChampionService'
import ChampionsScript from '../../Utils/ChampionsScript'

const dedSec = new SecResponse()
const create = new CreateChampionService()
const update = new UpdateChampionService()
const script = new ChampionsScript()

class ChampionController {
  public async store(request: Request, response: Response): Promise<object> {
    const { key }: any = request.body

    const champion = await create.execute(key)

    const res = dedSec.withOne(champion, 'Champion registered')
    return response.json(res)
  }

  public async update(request: Request, response: Response): Promise<object> {
    const { key }: any = request.params

    const champion = await update.execute(key)

    const res = dedSec.withOne(champion, 'Champion updated')
    return response.json(res)
  }

  public async storeAll(request: Request, response: Response): Promise<object> {
    const champions = await script.createChampions()

    const res = dedSec.withOne(champions, 'All champions registered')
    return response.json(res)
  }

  public async updateAll(
    request: Request,
    response: Response,
  ): Promise<object> {
    const champions = await script.updateChampions()

    const res = dedSec.withOne(champions, 'All champions updated')
    return response.json(res)
  }
}

export default ChampionController
