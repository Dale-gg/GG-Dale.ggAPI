import { getRepository } from 'typeorm'
import Summoner from '../../Models/Summoner'
import { LolApi } from '@dale-gg/zedjs/build'
import { ISubject, IObserver } from '../../../Interfaces/IObserver'
import AppError from '../../Errors/AppError'
import { Regions } from '@dale-gg/zedjs/build/constants'

class UpdateSummonerService implements ISubject {
  private observers: IObserver[] = []
  private summoner: Summoner
  private region: Regions

  public async execute(id: string): Promise<Summoner> {
    const api = new LolApi()
    const repository = getRepository(Summoner)

    const summoner: any = await repository.findOneOrFail({
      where: { id: id },
    })

    try {
      const { response: S }: any = await api.Summoner.getByName(
        summoner.summoner_name,
        summoner.region,
      )

      summoner.summoner_id = S.id
      summoner.account_id = S.accountId
      summoner.puuid = S.puuid
      summoner.summoner_name = S.name
      summoner.profile_icon = S.profileIconId
      summoner.revision_date = S.revisionDate
      summoner.summoner_level = S.summonerLevel

      await repository.save(summoner)

      this.summoner = summoner
      this.region = summoner.region
      this.notifyObservers()

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
      observer.updateSummoner(this.summoner, this.region)
    }
  }
}

export default UpdateSummonerService
