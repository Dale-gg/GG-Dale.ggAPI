import { IObserver, ISubject } from '../../../Interfaces/IObserver'
import { SummonerLeagueDto } from '@jlenon7/zedjs/dist/models-dto'
import { getRepository } from 'typeorm'
import { LolApi } from '@jlenon7/zedjs/dist'
import { Regions } from '@jlenon7/zedjs/dist/constants'
import Tier from '../../Models/Tier'
import Summoner from '../../Models/Summoner'

class TierService implements IObserver {
  private subject: ISubject
  private api: LolApi

  constructor(summonerService: ISubject) {
    this.subject = summonerService
    this.api = new LolApi()
    summonerService.registerObserver(this)
  }

  async updateSummoner(summoner: Summoner, region: Regions): Promise<void> {
    const repository = getRepository(Tier)

    const { response: tiers } = await this.api.League.bySummoner(
      summoner.summoner_id,
      region,
    )

    tiers.map(async (tier: SummonerLeagueDto) => {
      const total = tier.wins + tier.losses
      const winrate = (tier.wins / total) * 100

      const dbTier = repository.create({
        league_id: tier.leagueId,
        queue_type: tier.queueType,
        tier: tier.tier,
        rank: tier.rank,
        summoner: summoner,
        pdl: tier.leaguePoints,
        winrate: `${winrate}%`,
        wins: tier.wins,
        losses: tier.losses,
        veteran: tier.veteran,
        inactive: tier.inactive,
        fresh_blood: tier.freshBlood,
        hot_streak: tier.hotStreak,
        season: '10',
      })

      await repository.save(dbTier)
    })

    this.subject.removeObserver(this)
  }
}

export default TierService
