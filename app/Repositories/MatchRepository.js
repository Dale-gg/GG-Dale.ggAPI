/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Summoner = use('App/Models/Summoner');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Matchlist = use('App/Models/Matchlist');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const MatchDto = use('App/Models/MatchDto');

const MatchDtoRepository = use('App/Repositories/MatchDtoRepository');

const getMatchDto = require('../Utils/RiotAPI/getMatchDto');

class MatchRepository {
  constructor() {
    this.matchDtoRepository = new MatchDtoRepository();
  }

  async store(accountId, summonerRegion, matchListAPI) {
    const summoner = await Summoner.findByOrFail({
      account_id: accountId,
      region: summonerRegion,
    });

    // for (const match in matchListAPI) {
    //   const matchDto = await getMatchDto(region, matchListAPI[match].gameId);
    //   this.matchDtoRepository.store(matchDto);
    // }

    for (const match in matchListAPI) {
      const matchDto = await getMatchDto(summonerRegion, matchListAPI[match].gameId);
      const m = await this.matchDtoRepository.store(matchDto);
      const summonerMatchlist = await Matchlist.create({
        lane: matchListAPI[match].lane,
        game_id: matchListAPI[match].gameId,
        platform_id: matchListAPI[match].platformId,
        role: matchListAPI[match].role,
        season: matchListAPI[match].season,
        summoner_id: summoner.summoner_id,
        matchdto_id: m.id,
      });

      await summoner.matchs().save(summonerMatchlist);
      await summonerMatchlist.matchdto().save(m);
    }

    // matchListAPI.forEach(async function(element) {
    //   const matchDto = await getMatchDto(summonerRegion, element.gameId);
    //   this.matchDtoRepository.store(matchDto);
    //   const summonerMatchlist = await Matchlist.create({
    //     lane: element.lane,
    //     game_id: element.gameId,
    //     platform_id: element.platformId,
    //     role: element.role,
    //     season: element.season,
    //     summoner_id: summoner.summoner_id,
    //   });

    //   await summoner.matchs().save(summonerMatchlist);
    // });
  }
}

module.exports = MatchRepository;
