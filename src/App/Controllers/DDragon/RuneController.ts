import { Request, Response } from 'express'
import RunesScript from '../../Utils/RunesScript'
import { SecResponse } from '@jlenon7/dedsec/build/Responses'

const script = new RunesScript()
const dedSec = new SecResponse()

class RuneController {
  public async storeAll(request: Request, response: Response): Promise<object> {
    const runes = await script.createRunes()

    const res = dedSec.withOne(runes, 'All runes registered')
    return response.json(res)
  }
}

export default RuneController
