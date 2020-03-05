/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Summoner = use('App/Models/Summoner');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Matchlist = use('App/Models/Matchlist');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const MatchDto = use('App/Models/MatchDto');

const getMatchDto = require('../Utils/RiotAPI/getMatchDto');

class MatchRepository {
  async store(accountId, summonerRegion, matchListAPI) {
    const summoner = await Summoner.findByOrFail({
      account_id: accountId,
      region: summonerRegion,
    });

    // eslint-disable-next-line func-names
    await matchListAPI.forEach(async function(element) {
      const matchDtoAPI = await getMatchDto(summonerRegion, element.gameId);
      const summonerMatchlist = await Matchlist.create({
        lane: element.lane,
        game_id: element.gameId,
        platform_id: element.platformId,
        role: element.role,
        season: element.season,
        summoner_id: summoner.id,
      });

      const matchDto = await MatchDto.create({
        matchlist_id: summonerMatchlist.id,
        season_id: matchDtoAPI.seasonId,
        queue_id: matchDtoAPI.queueId,
        game_id: matchDtoAPI.gameId,
        platform_id: matchDtoAPI.platformId,
      });

      await summonerMatchlist.matchdto().save(matchDto);
      await summoner.matchs().save(summonerMatchlist);
    });

    return 'olar';
  }
}

module.exports = MatchRepository;
