import { getRepository } from 'typeorm'
import Summoner from '../../Models/Summoner'
import { LolApi } from '@jlenon7/zedjs/dist'
import { Regions } from '@jlenon7/zedjs/dist/constants'
import { ISubject, IObserver } from '../../../Interfaces/IObserver'
import AppError from '../../Errors/AppError'

class CreateSummonerService implements ISubject {
  private observers: IObserver[] = []
  private summoner: Summoner

  public async execute(sname: string, region: Regions): Promise<Summoner> {
    const api = new LolApi()
    const repository = getRepository(Summoner)

    try {
      const { response: S }: any = await api.Summoner.getByName(sname, region)

      this.summoner = S
      this.notifyObservers()

      const summoner = repository.create({
        summoner_id: S.id,
        account_id: S.accountId,
        puuid: S.puuid,
        summoner_name: S.name,
        profile_icon: S.profileIconId,
        revision_date: S.revisionDate,
        summoner_level: S.summonerLevel,
        region,
      })

      await repository.save(summoner)

      return summoner
    } catch (error) {
      if (error.status === 404) {
        throw new AppError(
          `Summoner ${sname} not found in region ${region}`,
          404,
        )
      }

      throw new AppError(
        'Riot services are current offline, please try again later',
        403,
      )
    }
  }

  registerObserver(o: IObserver): void {
    this.observers.push(o)
  }

  removeObserver(o: IObserver): void {
    const index = this.observers.indexOf(o)
    this.observers.splice(index, 1)
  }

  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.updateSummoner(this.summoner)
    }
  }
}

export default CreateSummonerService
