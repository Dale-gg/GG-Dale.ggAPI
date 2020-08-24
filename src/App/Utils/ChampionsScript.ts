import { LolApi } from '@dale-gg/zedjs/build'
import { getRepository } from 'typeorm'
import Champion from '../Models/Champion'

const api = new LolApi()

class ChampionsScript {
  public async createChampions(): Promise<Champion[]> {
    const { data } = await api.DataDragon.getChampion()
    const repository = getRepository(Champion)

    for (const champion in data) {
      const dataObj = data[champion]

      const image_full = `http://ddragon.leagueoflegends.com/cdn/${dataObj.version}/img/champion/${dataObj.image.full}`
      const image_splash = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${dataObj.name}_0.jpg`
      const image_loading = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${dataObj.name}_0.jpg`

      const newChamp = repository.create({
        name: dataObj.name,
        key: dataObj.key,
        title: dataObj.title,
        tags: dataObj.tags,
        version: dataObj.version,
        image_full_url: image_full,
        image_loading_url: image_loading,
        image_splash_url: image_splash,
        image_sprite_url: dataObj.image.sprite,
      })

      await repository.save(newChamp)
    }

    const champions = repository.find()

    return champions
  }

  public async updateChampions(): Promise<Champion[]> {
    const { data } = await api.DataDragon.getChampion()
    const repository = getRepository(Champion)

    for (const champion in data) {
      const dataObj = data[champion]

      const oldChamp = await repository.findOne({
        where: {
          name: dataObj.name,
        },
      })

      const image_full = `http://ddragon.leagueoflegends.com/cdn/${dataObj.version}/img/champion/${dataObj.image.full}`
      const image_splash = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${dataObj.name}_0.jpg`
      const image_loading = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${dataObj.name}_0.jpg`

      if (oldChamp) {
        oldChamp.name = dataObj.name
        oldChamp.key = dataObj.key
        oldChamp.title = dataObj.title
        oldChamp.tags = dataObj.tags
        oldChamp.version = dataObj.version
        oldChamp.image_full_url = image_full
        oldChamp.image_loading_url = image_loading
        oldChamp.image_splash_url = image_splash
        oldChamp.image_sprite_url = dataObj.image.sprite

        await repository.save(oldChamp)
      }
    }

    const champions = repository.find()

    return champions
  }
}

export default ChampionsScript
