const getSummoner = require('../../Utils/RiotAPI/getSummoner');
const getTier = require('../../Utils/RiotAPI/getTier');

class SummonerController {
  async index({ response, params }) {
    const { region, summonerName } = params;
    
    const summoner = await getSummoner(region, summonerName);

    const tiers = await getTier(summoner.id, region);
    const tierSolo = tiers[0];
    //const tierFlex = tiers[1];

    return response.status(200).json({ type: 'get-summoner', msg: 'Invocador encontrado!', summoner, tierSolo});
  }

  async store({  }) {
    
  }
}

module.exports = SummonerController;
