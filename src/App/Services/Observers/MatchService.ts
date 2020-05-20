import { IObserver, ISubject } from '../../../Interfaces/IObserver'
import { Regions } from '@jlenon7/zedjs/dist/constants'
import Summoner from '../../Models/Summoner'

class MatchService implements IObserver {
  private subject: ISubject

  constructor(summonerService: ISubject) {
    this.subject = summonerService
    summonerService.registerObserver(this)
  }

  updateSummoner(summoner: Summoner, region: Regions): void {
    console.log(
      `> [MATCH] Summoner ${summoner.summoner_name}, region: ${region}`,
    )
  }
}

export default MatchService
