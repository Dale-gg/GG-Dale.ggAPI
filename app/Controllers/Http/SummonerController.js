const getSummoner = require('../../Utils/RiotAPI/getSummoner');
const getTier = require('../../Utils/RiotAPI/getTier');
const getMatchs = require('../../Utils/RiotAPI/getMatchs');

class SummonerController {
  async index({ response, params }) {
    const { region, summonerName } = params;
    
    const summoner = await getSummoner(region, summonerName);

    const tiers = await getTier(summoner.id, region);
    const tierSolo = tiers[0];
    const tierFlex = tiers[1];

    const matchs = await getMatchs(region, summoner.accountId);

    return response.status(200).json({ type: 'get-summoner', msg: 'Invocador encontrado!', summoner, tierSolo, tierFlex, matchs});
  }

  async store({  }) {
    
  }
}

module.exports = SummonerController;
