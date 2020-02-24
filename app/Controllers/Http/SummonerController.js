const RiotAPI = require('../../Utils/RiotAPI/getSummoner');

class SummonerController {
  async index({ response, params }) {
    const { region, summonerName } = params;
    
    const summoner = await RiotAPI(region, summonerName);

    console.log(summoner);
  }
}

module.exports = SummonerController;
