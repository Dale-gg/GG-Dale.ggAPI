import faker from 'faker'
import { getRepository } from 'typeorm'

import IFactory from '../Interfaces/IFactory'
import ISummoner, { ISummonerObject } from '../Interfaces/ISummoner'
import IChampion from '../Interfaces/IChampion'
import Summoner from '../App/Models/Summoner'
import Champion from '../App/Models/Champion'
import IRune, { IRuneObject } from '../Interfaces/IRune'
import Rune from '../App/Models/Rune'
import ITree, { ITreeObject } from '../Interfaces/ITree'
import Tree from '../App/Models/Tree'

export default class Factory implements IFactory {
  public async Summoner(data: ISummoner = {}): Promise<ISummonerObject> {
    const repository = getRepository(Summoner)

    const summoner = repository.create({
      account_id: faker.random.uuid(),
      summoner_id: data.summoner_id || faker.random.uuid(),
      profile_icon: faker.random.number(),
      summoner_level: faker.random.number(),
      puuid: faker.random.uuid(),
      revision_date: faker.random.number(),
      region: data.region || 'br1',
      summoner_name: data.summoner_name || 'iLenon7',
    })

    await repository.save(summoner)

    return summoner
  }

  public async ManySummoners(
    value: number,
    data: ISummoner = {},
  ): Promise<void> {
    const repository = getRepository(Summoner)

    for (let i = 1; i <= value; i++) {
      const summoner = repository.create({
        account_id: faker.random.uuid(),
        summoner_id: faker.random.uuid(),
        puuid: faker.random.uuid(),
        revision_date: faker.random.number(),
        region: `${data.region}:${value}` || `br1:${value}`,
        summoner_name: `${data.summoner_name}:${value}` || `'iLenon7:${value}'`,
        ...data,
      })

      await repository.save(summoner)
    }
  }

  public async Champion(data: IChampion): Promise<void> {
    const repository = getRepository(Champion)

    const champion = repository.create({
      name: data.name,
      key: data.key,
      title: data.title,
      tags: data.tags,
      version: '10.10.3208608',
      image_full_url: 'http://localhost:3333',
      image_loading_url: 'http://localhost:3333',
      image_splash_url: 'http://localhost:3333',
      image_sprite_url: 'http://localhost:3333',
    })

    await repository.save(champion)
  }

  public async Tree(data: ITree): Promise<ITreeObject> {
    const repository = getRepository(Tree)

    const tree = repository.create({
      id_api: data.id_api,
      key: data.key,
      icon: data.icon,
      name: data.name,
    })

    await repository.save(tree)

    return tree
  }

  public async Rune(data: IRune): Promise<IRuneObject> {
    const repository = getRepository(Rune)

    const rune = repository.create({
      id_api: data.id_api,
      key: data.key,
      icon: data.icon,
      name: data.name,
      shortDesc: data.shortDesc,
      longDesc: data.longDesc,
      tree: data.tree,
    })

    await repository.save(rune)

    return rune
  }
}
