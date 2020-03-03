/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Summoner = use('App/Models/Summoner');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Matchlist = use('App/Models/Matchlist');

const Database = use('Database');

class TierRepository {
  async store(accountId, summonerRegion, matchListAPI) {
    const summoner = await Summoner.findByOrFail({
      account_id: accountId,
      region: summonerRegion,
    });

    matchListAPI.forEach(async function(element) {
      const trx = await Database.beginTransaction();
      const summonerMatchlist = await Matchlist.create(
        {
          lane: element.lane,
          game_id: element.gameId,
          platform_id: element.platformId,
          role: element.role,
          season: element.season,
          summoner_id: summoner.summoner_id,
        },
        trx
      );

      trx.commit();
      await summoner.matchs().save(summonerMatchlist);
    });
  }
}

module.exports = TierRepository;
