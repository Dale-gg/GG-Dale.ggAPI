import { getRepository } from 'typeorm'
import Champion from '../Models/Champion'
import { LolApi } from '@jlenon7/zedjs/dist'
import { Champions } from '@jlenon7/zedjs/dist/constants'
import AppError from '../Errors/AppError'

class CreateChampionService {
  public async execute(champion: Champions): Promise<Champion> {
    const api = new LolApi()
    const repository = getRepository(Champion)

    try {
      const data = await api.DataDragon.getChampion(champion)

      const image_full = `http://ddragon.leagueoflegends.com/cdn/10.10.3208608/img/champion/${data.image.full}`
      const image_splash = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${data.name}_0.jpg`
      const image_loading = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.name}_0.jpg`

      const champ = repository.create({
        name: data.name,
        key: data.key,
        title: data.title,
        tags: data.tags,
        version: '10.10.3208608',
        image_full_url: image_full,
        image_splash_url: image_splash,
        image_loading_url: image_loading,
        image_sprite_url: data.image.sprite,
      })

      await repository.save(champ)

      return champ
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

export default CreateChampionService
