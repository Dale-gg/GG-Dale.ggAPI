import { getRepository } from 'typeorm'
import Summoner from '../../Models/Summoner'
import { LolApi } from '@dale-gg/zedjs/build'
import { Regions } from '@dale-gg/zedjs/build/constants'
import { ISubject, IObserver } from '../../../Interfaces/IObserver'
import AppError from '../../Errors/AppError'

class CreateSummonerService implements ISubject {
  private observers: IObserver[] = []
  private summoner: Summoner
  private region: Regions

  public async execute(sname: string, region: Regions): Promise<Summoner> {
    const api = new LolApi()
    const repository = getRepository(Summoner)

    try {
      const { response: S }: any = await api.Summoner.getByName(sname, region)

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

      this.summoner = summoner
      this.region = region
      this.notifyObservers()

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
      observer.updateSummoner(this.summoner, this.region)
    }
  }
}

export default CreateSummonerService
