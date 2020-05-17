import { getRepository } from 'typeorm'
import Summoner from '../../Models/Summoner'
import { LolApi } from '@jlenon7/zedjs/dist'
import { ISubject, IObserver } from '../../../Interfaces/IObserver'
import AppError from '../../Errors/AppError'

class UpdateSummonerService implements ISubject {
  private observers: IObserver[] = []
  private summoner: Summoner

  public async execute(id: string): Promise<Summoner> {
    const api = new LolApi()
    const repository = getRepository(Summoner)

    const summoner: any = await repository.findOneOrFail({
      where: { id: id },
    })

    try {
      const { response: S }: any = await api.Summoner.getById(
        summoner.summoner_id,
        summoner.region,
      )

      this.summoner = S
      this.notifyObservers()

      summoner.summoner_id = S.id
      summoner.account_id = S.accountId
      summoner.puuid = S.puuid
      summoner.summoner_name = S.name
      summoner.profile_icon = S.profileIconId
      summoner.revision_date = S.revisionDate
      summoner.summoner_level = S.summonerLevel

      await repository.save(summoner)

      return summoner
    } catch (error) {
      if (error.status === 404) {
        throw new AppError(
          `Summoner of ID ${summoner.summoner_id} not found in region ${summoner.region}`,
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

export default UpdateSummonerService
