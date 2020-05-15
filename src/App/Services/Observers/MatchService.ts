import { IObserver, ISubject } from '../../../types/IObserver'
import { SummonerV4DTO } from '@jlenon7/zedjs/dist/models-dto'

class MatchService implements IObserver {
  private subject: ISubject

  constructor(summonerService: ISubject) {
    this.subject = summonerService
    summonerService.registerObserver(this)
  }

  updateSummoner(summoner: SummonerV4DTO): void {
    console.log(`> [MATCH] Summoner ${summoner.name}`)
  }
}

export default MatchService
