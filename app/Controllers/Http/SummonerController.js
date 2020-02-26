/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Summoner = use('App/Models/Summoner');

const getSummoner = require('../../Utils/RiotAPI/getSummoner');
const getTier = require('../../Utils/RiotAPI/getTier');
const getMatchs = require('../../Utils/RiotAPI/getMatchs');

class SummonerController {
  async index({ response, params }) {
    const { region, summonerName } = params;
    
    const summonerAPI = await getSummoner(region, summonerName);

    const summonerDB = await Summoner.create({
      accountId: summonerAPI.accountId,
      summonerId: summonerAPI.id,
      puuid: summonerAPI.puuid,
      summonerName: summonerAPI.name,
      revisionDate: summonerAPI.revisionDate
    });

    const tiers = await getTier(summonerAPI.id, region);
    const tierSolo = tiers[0];
    const tierFlex = tiers[1];

    const matchs = await getMatchs(region, summonerAPI.accountId);

    // Nível banco de dados
    // for(var game in games) {
    //   const matchDto = await Axios.get(
    //       `https://${region}${getMatchDto}${games[game].gameId}${Env.get('RIOT_KEY')}`
    //   );
    // }

    return response.status(200).json({ type: 'get-summoner', msg: 'Invocador encontrado!', summonerAPI, tierSolo, tierFlex, matchs});
  }

  async store({  }) {
    
  }
}

module.exports = SummonerController;
