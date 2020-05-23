import { IObserver, ISubject } from '../../../Interfaces/IObserver'
import { Regions } from '@jlenon7/zedjs/dist/constants'
import Summoner from '../../Models/Summoner'
import { getRepository } from 'typeorm'
import { LolApi } from '@jlenon7/zedjs/dist'
import Match from '../../Models/Match'
import { MatchListingMatches } from '@jlenon7/zedjs/dist/models-dto'
import Champion from '../../Models/Champion'

class MatchService implements IObserver {
  private subject: ISubject
  private api: LolApi

  constructor(summonerService: ISubject) {
    this.subject = summonerService
    this.api = new LolApi()
    summonerService.registerObserver(this)
  }

  async updateSummoner(summoner: Summoner, region: Regions): Promise<void> {
    const { response: matchlist } = await this.api.Match.list(
      summoner.account_id,
      region,
    )

    matchlist.matches.map(async (match: MatchListingMatches) => {
      await this.createMatch(summoner, match, region)
    })

    this.subject.removeObserver(this)
  }

  async createMatch(
    summoner: Summoner,
    matchlist: MatchListingMatches,
    region: Regions,
  ): Promise<void> {
    const matchRepo = getRepository(Match)
    const championRepo = getRepository(Champion)

    const { response: matchApi } = await this.api.Match.get(
      matchlist.gameId,
      region,
    )

    const champion = await championRepo.findOne({
      where: { key: matchlist.champion },
    })

    const match = matchRepo.create({
      champion: champion,
      summoner: summoner,
      champion_key: matchlist.champion,
      role: matchlist.role,
      game_creation: matchApi.gameCreation,
      game_duration: matchApi.gameDuration,
      game_mode: matchApi.gameMode,
      game_type: matchApi.gameType,
      game_version: matchApi.gameVersion,
      platform_id: matchApi.platformId,
      queue_id: matchApi.queueId,
      map_id: matchApi.mapId,
      game_id: matchApi.gameId,
      season_id: matchApi.seasonId,
      remake: matchApi.remake,
      timestamp: matchlist.timestamp,
    })

    await matchRepo.save(match)
  }
}

export default MatchService
