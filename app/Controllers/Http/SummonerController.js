/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Summoner = use('App/Models/Summoner');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Tier = use('App/Models/Tier');

const getSummoner = require('../../Utils/RiotAPI/getSummoner');
const getTier = require('../../Utils/RiotAPI/getTier');
const getMatchs = require('../../Utils/RiotAPI/getMatchs');

class SummonerController {
  async show({ response, params }) {
    console.log('ENTROU NO SHOW');
    const { region, summonerName } = params;

    const summoner = await Summoner.query()
      .where({
        summonerName,
        region,
      })
      .fetch();

    return response.status(200).json({
      type: 'get-summoner',
      msg: 'Invocador encontrado!',
      summoner,
    });
  }

  async store({ response, params }) {
    console.log('ENTROU NO STORE');
    const { region, summonerName } = params;

    const summonerAPI = await getSummoner(region, summonerName);

    Summoner.create({
      accountId: summonerAPI.accountId,
      summonerId: summonerAPI.id,
      puuid: summonerAPI.puuid,
      region,
      summonerName: summonerAPI.name,
      revisionDate: summonerAPI.revisionDate,
    });

    const tiers = await getTier(summonerAPI.id, region);
    const tierSolo = tiers[0];

    if (tierSolo) {
      Tier.create({
        summonerId: summonerAPI.id,
        leagueId: tierSolo.leagueId,
        queueType: tierSolo.queueType,
        tier: tierSolo.tier,
        rank: tierSolo.rank,
        pdl: tierSolo.leaguePoints,
        wins: tierSolo.wins,
        losses: tierSolo.losses,
        inactive: tierSolo.inactive,
        freshBlood: tierSolo.freshBlood,
        hotStreak: tierSolo.hotStreak,
      });
    }

    const tierFlex = tiers[1];

    if (tierFlex) {
      Tier.create({
        summonerId: summonerAPI.id,
        leagueId: tierFlex.leagueId,
        queueType: tierFlex.queueType,
        tier: tierFlex.tier,
        rank: tierFlex.rank,
        pdl: tierFlex.leaguePoints,
        wins: tierFlex.wins,
        losses: tierFlex.losses,
        inactive: tierFlex.inactive,
        freshBlood: tierFlex.freshBlood,
        hotStreak: tierFlex.hotStreak,
      });
    }

    const matchs = await getMatchs(region, summonerAPI.accountId);

    return response.status(200).json({
      type: 'get-summoner',
      msg: 'Invocador encontrado!',
      summonerAPI,
      tierSolo,
      tierFlex,
      matchs,
    });

    // Nível banco de dados
    // for(var game in games) {
    //   const matchDto = await Axios.get(
    //       `https://${region}${getMatchDto}${games[game].gameId}${Env.get('RIOT_KEY')}`
    //   );
    // }
  }
}

module.exports = SummonerController;
