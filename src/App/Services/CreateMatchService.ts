import { IObserver, ISubject } from '../../@types/IObserver'

class CreateMatchService implements IObserver {
  private subject: ISubject

  constructor(summonerService: ISubject) {
    this.subject = summonerService
    summonerService.registerObserver(this)
  }

  updateSummoner(summoner: object): void {
    console.log('Fetching the Summoner Matchs from Riot API')
    console.log(summoner)
  }
}

export default CreateMatchService
