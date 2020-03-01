/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Summoner = use('App/Models/Summoner');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Tier = use('App/Models/Tier');

const getSummoner = require('../Utils/RiotAPI/getSummoner');
const getTier = require('../Utils/RiotAPI/getTier');
const getMatchs = require('../Utils/RiotAPI/getMatchs');

class SummonerService {
  async show({ region, summonerName }) {
    const summoner = await Summoner.findByOrFail({
      region,
      summoner_name: summonerName,
    });

    const tier = await summoner.tiers().fetch();
    const tiersolo = tier.rows[0];
    const tierflex = tier.rows[1];

    const objectResponse = {
      summoner: {
        id: summoner.id,
        account_id: summoner.account_id,
        summoner_id: summoner.summoner_id,
        puuid: summoner.puuid,
        summoner_name: summoner.summoner_name,
        region: summoner.region,
        revision_date: summoner.revision_date,
        tiersolo: {
          id: tiersolo.id || 'not-ranked',
          league_id: tiersolo.league_id || 'not-ranked',
          queue_type: tiersolo.queue_type || 'not-ranked',
          tier: tiersolo.tier || 'not-ranked',
          rank: tiersolo.rank || 'not-ranked',
          pdl: tiersolo.pdl || 'not-ranked',
          winrate: tiersolo.winrate || 'not-ranked',
          wins: tiersolo.wins || 'not-ranked',
          losses: tiersolo.losses || 'not-ranked',
          inactive: tiersolo.inactive || 'not-ranked',
          hot_streak: tiersolo.hot_streak || 'not-ranked',
          fresh_blood: tiersolo.fresh_blood || 'not-ranked',
          season: tiersolo.season || 'not-ranked',
        },
        tierflex: {
          id: 'not-ranked' || tierflex.id,
          league_id: tierflex.league_id || 'not-ranked',
          queue_type: tierflex.queue_type || 'not-ranked',
          tier: tierflex.tier || 'not-ranked',
          rank: tierflex.rank || 'not-ranked',
          pdl: tierflex.pdl || 'not-ranked',
          winrate: tierflex.winrate || 'not-ranked',
          wins: tierflex.wins || 'not-ranked',
          losses: tierflex.losses || 'not-ranked',
          inactive: tierflex.inactive || 'not-ranked',
          hot_streak: tierflex.hot_streak || 'not-ranked',
          fresh_blood: tierflex.fresh_blood || 'not-ranked',
          season: tierflex.season || 'not-ranked',
        },
      },
    };

    return objectResponse;
  }

  async store({ region, summonerName }) {
    const summonerAPI = await getSummoner(region, summonerName);

    Summoner.create({
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
      Tier.create({
        summoner_id: summonerAPI.id,
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
    }

    const tierFlex = tiers[1];

    if (tierFlex) {
      Tier.create({
        summoner_id: summonerAPI.id,
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
    }

    const matchs = await getMatchs(region, summonerAPI.accountId);

    // Nível banco de dados
    // for(var game in games) {
    //   const matchDto = await Axios.get(
    //       `https://${region}${getMatchDto}${games[game].gameId}${Env.get('RIOT_KEY')}`
    //   );
    // }

    const summoner = await Summoner.query()
      .where({
        summonerName,
        region,
      })
      .with('tiers')
      .fetch();

    return summoner;
  }
}

module.exports = SummonerService;
