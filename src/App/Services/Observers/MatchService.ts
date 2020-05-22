import { IObserver, ISubject } from '../../../Interfaces/IObserver'
import { Regions } from '@jlenon7/zedjs/dist/constants'
import Summoner from '../../Models/Summoner'
import { getRepository } from 'typeorm'
import { LolApi } from '@jlenon7/zedjs/dist'
import Match from '../../Models/Match'
import Matchlist from '../../Models/Matchlist'
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
    match: MatchListingMatches,
    region: Regions,
  ): Promise<void> {
    const matchlistRepo = getRepository(Matchlist)
    const championRepo = getRepository(Champion)

    const champion = await championRepo.findOne({
      where: { key: match.champion },
    })

    const matchlist = matchlistRepo.create({
      lane: match.lane,
      game_id: match.gameId,
      platform_id: match.platformId,
      summoner: summoner,
      champion: champion,
      champion_key: match.champion,
      queue: match.queue,
      role: match.role,
      season: match.season,
      timestamp: match.timestamp,
    })

    await matchlistRepo.save(matchlist)

    await this.createMatchDto(matchlist, region)
  }

  async createMatchDto(matchlist: Matchlist, region: Regions): Promise<void> {
    const matchRepo = getRepository(Match)

    const { response: matchApi } = await this.api.Match.get(
      matchlist.game_id,
      region,
    )

    const match = matchRepo.create({
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
      matchlist: matchlist,
    })

    await matchRepo.save(match)
  }
}

export default MatchService
