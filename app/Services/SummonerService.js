/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Summoner = use('App/Models/Summoner');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Tier = use('App/Models/Tier');

const getSummoner = require('../Utils/RiotAPI/getSummoner');
const getTier = require('../Utils/RiotAPI/getTier');
const getMatchs = require('../Utils/RiotAPI/getMatchs');

class SummonerService {
  async show({ region, summonerName }) {
    const summoner = await Summoner.query()
      .where({ region, summoner_name: summonerName })
      .with('tiers')
      .fetch();

    return summoner;
  }

  async store({ region, summonerName }) {
    const summonerAPI = await getSummoner(region, summonerName);

    const summoner = await Summoner.create({
      account_id: summonerAPI.accountId,
      summoner_id: summonerAPI.id,
      puuid: summonerAPI.puuid,
      region,
      summoner_name: summonerAPI.name,
      revision_date: summonerAPI.revisionDate,
    });

    const tiers = await getTier(summonerAPI.id, region);
    const tierSolo = tiers[0];

    if (tierSolo) {
      const summonerSoloTier = await Tier.create({
        summoner_id: summoner.id,
        league_id: tierSolo.leagueId,
        queue_type: tierSolo.queueType,
        tier: tierSolo.tier,
        rank: tierSolo.rank,
        pdl: tierSolo.leaguePoints,
        wins: tierSolo.wins,
        losses: tierSolo.losses,
        inactive: tierSolo.inactive,
        fresh_blood: tierSolo.freshBlood,
        hot_streak: tierSolo.hotStreak,
      });
      await summoner.tiers().save(summonerSoloTier);
    }

    const tierFlex = tiers[1];

    if (tierFlex) {
      const summonerFlexTier = await Tier.create({
        summoner_id: summoner.id,
        league_id: tierFlex.leagueId,
        queue_type: tierFlex.queueType,
        tier: tierFlex.tier,
        rank: tierFlex.rank,
        pdl: tierFlex.leaguePoints,
        wins: tierFlex.wins,
        losses: tierFlex.losses,
        inactive: tierFlex.inactive,
        fresh_blood: tierFlex.freshBlood,
        hot_streak: tierFlex.hotStreak,
      });
      await summoner.tiers().save(summonerFlexTier);
    }

    const matchs = await getMatchs(region, summonerAPI.accountId);

    // Nível banco de dados
    // for(var game in games) {
    //   const matchDto = await Axios.get(
    //       `https://${region}${getMatchDto}${games[game].gameId}${Env.get('RIOT_KEY')}`
    //   );
    // }

    const resSummoner = await Summoner.query()
      .where({
        summoner_name: summonerName,
        region,
      })
      .with('tiers')
      .fetch();

    return resSummoner;
  }
}

module.exports = SummonerService;
