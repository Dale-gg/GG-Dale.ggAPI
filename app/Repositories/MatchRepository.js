/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Summoner = use('App/Models/Summoner');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Champion = use('App/Models/Champion');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Matchlist = use('App/Models/Matchlist');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const MatchDto = use('App/Models/MatchDto');

const ParticipantRepository = use('App/Repositories/ParticipantRepository');

const getMatchDto = require('../Utils/RiotAPI/getMatchDto');
const deleteOldMatchs = require('../Utils/RiotAPI/deleteOldMatchs');

class MatchRepository {
  constructor() {
    this.participantRepository = new ParticipantRepository();
  }

  async store(accountId, summonerRegion, match) {
    const deleteMatchs = await deleteOldMatchs();
    console.log('oie', deleteMatchs);

    const champion = await Champion.findByOrFail({
      key: match.champion,
    });

    const summoner = await Summoner.findByOrFail({
      account_id: accountId,
      region: summonerRegion,
    });

    const matchDtoAPI = await getMatchDto(summonerRegion, match.gameId);
    const { participantIdentities, participants } = matchDtoAPI;

    const summonerMatchlist = await Matchlist.create({
      lane: match.lane,
      game_id: match.gameId,
      platform_id: match.platformId,
      role: match.role,
      timestamp: match.timestamp,
      queue: match.queue,
      season: match.season,
      summoner_id: summoner.id,
      champion_id: champion.id,
      champion_key: match.champion,
    });

    const matchDto = await MatchDto.create({
      matchlist_id: summonerMatchlist.id,
      season_id: matchDtoAPI.seasonId,
      queue_id: matchDtoAPI.queueId,
      game_id: matchDtoAPI.gameId,
      map_id: matchDtoAPI.mapId,
      platform_id: matchDtoAPI.platformId,
      game_type: matchDtoAPI.gameType,
      game_mode: matchDtoAPI.gameMode,
      game_version: matchDtoAPI.gameVersion,
      game_duration: matchDtoAPI.gameDuration,
      game_creation: matchDtoAPI.gameCreation,
    });

    const promises = [];
    for (const participant in participants) {
      promises.push(
        this.participantRepository.store(
          participants[participant],
          participantIdentities,
          matchDto.id,
          matchDto.game_id,
          participant
        )
      );
    }
    await Promise.all(promises);

    await champion.matchlist().save(summonerMatchlist);
    await summonerMatchlist.matchdto().save(matchDto);
    await summoner.matchs().save(summonerMatchlist);
  }
}

module.exports = MatchRepository;
