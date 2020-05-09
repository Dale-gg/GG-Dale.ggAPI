import faker from 'faker'
import { getRepository } from 'typeorm'

import { IFactory, IChampion, ISummoner } from './Types'
import Summoner from '../Models/Summoner'
import Champion from '../Models/Champion'

export default class Factory implements IFactory {
  public async Summoner (data: ISummoner = {}): Promise<void> {
    const repository = getRepository(Summoner);

    const summoner = repository.create({
      account_id: faker.random.uuid(),
      summoner_id: faker.random.uuid(),
      puuid: faker.random.uuid(),
      revision_date: faker.date.recent(),
      region: data.region || 'br1',
      summoner_name: data.summonerName || 'iLenon7',
      ...data,
    })

    await repository.save(summoner)
  }

  public async ManySummoners (value: number, data: ISummoner = {}): Promise<void> {
    const repository = getRepository(Summoner);

    for (let i=1; i<=value; i++) {
      const summoner = repository.create({
        account_id: faker.random.uuid(),
        summoner_id: faker.random.uuid(),
        puuid: faker.random.uuid(),
        revision_date: faker.date.recent(),
        region: `${data.region}:${value}` || `br1:${value}`,
        summoner_name: `${data.summonerName}:${value}` || `'iLenon7:${value}'`,
        ...data,
      })

      await repository.save(summoner)
    }
  }

  public async Champion (data: IChampion): Promise<void> {
    const repository = getRepository(Champion);

    const champion = repository.create({
      name: data.name,
      key: data.key,
      title: data.title,
      tags: data.tags,
      version: data.version,
      image_full_url: 'http://localhost:3333',
      image_loading_url: 'http://localhost:3333',
      image_splash_url: 'http://localhost:3333',
      image_sprite_url: 'http://localhost:3333',
    })

    await repository.save(champion)
  }
}
