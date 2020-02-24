const RiotAPI = require('../../Utils/RiotAPI/getSummoner');

class SummonerController {
  async index({ response, params }) {
    const { region, summonerName } = params;
    
    const summoner = await RiotAPI(region, summonerName);

    return response.status(200).json({ type: 'get-summoner', msg: 'Invocador encontrado!', summoner});
  }

  async store({  }) {
    
  }
}

module.exports = SummonerController;
