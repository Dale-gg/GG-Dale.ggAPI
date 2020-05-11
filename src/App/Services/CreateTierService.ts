import { IObserver, ISubject } from '../../@types/IObserver'

class CreateTierService implements IObserver {
  private subject: ISubject

  constructor(summonerService: ISubject) {
    this.subject = summonerService
    summonerService.registerObserver(this)
  }

  updateSummoner(summoner: object): void {
    console.log('Fetching the Summoner Tiers from Riot API')
  }
}

export default CreateTierService
