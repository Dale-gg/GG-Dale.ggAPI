import { getRepository } from 'typeorm'
import Champion from '../../Models/Champion'
import { LolApi } from '@dale-gg/zedjs/build'
import { Champions } from '@dale-gg/zedjs/build/constants'
import AppError from '../../Errors/AppError'

class UpdateChampionService {
  public async execute(champion: Champions): Promise<Champion> {
    const api = new LolApi()
    const repository = getRepository(Champion)

    try {
      const oldChamp = await repository.findOne({
        where: {
          key: champion,
        },
      })

      const data = await api.DataDragon.getChampion(champion)

      const image_full = `http://ddragon.leagueoflegends.com/cdn/10.10.3208608/img/champion/${data.image.full}`
      const image_splash = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.name}_0.jpg`
      const image_loading = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.name}_0.jpg`

      if (oldChamp) {
        oldChamp.name = data.name
        oldChamp.key = data.key
        oldChamp.title = data.title
        oldChamp.tags = data.tags
        oldChamp.version = '10.10.3208608'
        oldChamp.image_full_url = image_full
        oldChamp.image_splash_url = image_splash
        oldChamp.image_loading_url = image_loading

        await repository.save(oldChamp)

        return oldChamp
      }

      throw new AppError(`Champion ${champion} not found`, 404)
    } catch (error) {
      if (error.status === 404) {
        throw new AppError(`Champion ${champion} not found`, 404)
      } else if (error.name === 'QueryFailedError') {
        throw new AppError(error.message, 400)
      }

      throw new AppError(
        'DDragon services are current offline, please try again later',
        403,
      )
    }
  }
}

export default UpdateChampionService
