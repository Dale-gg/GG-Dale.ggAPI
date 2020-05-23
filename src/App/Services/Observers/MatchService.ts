import { IObserver, ISubject } from '../../../Interfaces/IObserver'
import { Regions } from '@jlenon7/zedjs/dist/constants'
import Summoner from '../../Models/Summoner'
import { getRepository } from 'typeorm'
import { LolApi } from '@jlenon7/zedjs/dist'
import Match from '../../Models/Match'
import { MatchListingMatches, MatchDto } from '@jlenon7/zedjs/dist/models-dto'
import Champion from '../../Models/Champion'
import Participant from '../../Models/Participant'
import { IMatchObject } from '../../../Interfaces/IMatch'

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

    await this.createParticipant(matchApi, match)
  }

  async createParticipant(
    matchApi: MatchDto,
    match: IMatchObject,
  ): Promise<void> {
    const repository = getRepository(Participant)
    const championRepo = getRepository(Champion)
    const players = matchApi.participantIdentities
    const playersDto = matchApi.participants

    for (const player in players) {
      const champion = await championRepo.findOne({
        where: { key: playersDto[player].championId },
      })

      const participantDb = repository.create({
        match: match,
        champion: champion,
        account_id: players[player].player.accountId,
        profile_icon: players[player].player.profileIcon,
        summoner_name: players[player].player.summonerName,
        summoner_id: players[player].player.summonerId,
        participant_api_id: players[player].participantId,
        game_id: match.game_id,
        spell1_id: playersDto[player].spell1Id,
        spell2_id: playersDto[player].spell2Id,
        highest_achieved_season_tier:
          playersDto[player].highestAchievedSeasonTier,
        team_id: playersDto[player].teamId,
        champion_key: playersDto[player].championId,
        kills: playersDto[player].stats.kills,
        deaths: playersDto[player].stats.deaths,
        assists: playersDto[player].stats.assists,
        cs: playersDto[player].stats.totalMinionsKilled,
        gold_earned: playersDto[player].stats.goldEarned,
        turret_kills: playersDto[player].stats.turretKills,
        double_kills: playersDto[player].stats.doubleKills,
        triple_kills: playersDto[player].stats.tripleKills,
        quadra_kills: playersDto[player].stats.quadraKills,
        penta_kills: playersDto[player].stats.pentaKills,
        win: playersDto[player].stats.win,
        champ_level: playersDto[player].stats.champLevel,
        perk0: playersDto[player].stats.perk0,
        perk1: playersDto[player].stats.perk1,
        perk2: playersDto[player].stats.perk2,
        perk3: playersDto[player].stats.perk3,
        perk4: playersDto[player].stats.perk4,
        perk5: playersDto[player].stats.perk5,
        item0: playersDto[player].stats.item0,
        item1: playersDto[player].stats.item1,
        item2: playersDto[player].stats.item2,
        item3: playersDto[player].stats.item3,
        item4: playersDto[player].stats.item4,
        item5: playersDto[player].stats.item5,
        item6: playersDto[player].stats.item6,
      })

      await repository.save(participantDb)
    }
  }
}

export default MatchService
