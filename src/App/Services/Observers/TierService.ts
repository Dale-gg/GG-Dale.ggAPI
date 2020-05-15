import { IObserver, ISubject } from '../../../types/IObserver'
import { SummonerV4DTO } from '@jlenon7/zedjs/dist/models-dto'

class TierService implements IObserver {
  private subject: ISubject

  constructor(summonerService: ISubject) {
    this.subject = summonerService
    summonerService.registerObserver(this)
  }

  updateSummoner(summoner: SummonerV4DTO): void {
    console.log(`> [TIER] Summoner ${summoner.name}`)
  }
}

export default TierService
