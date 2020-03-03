/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Summoner = use('App/Models/Summoner');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Tier = use('App/Models/Tier');

const getSummoner = require('../Utils/RiotAPI/getSummoner');
const getTier = require('../Utils/RiotAPI/getTier');
const getMatchs = require('../Utils/RiotAPI/getMatchs');

const SummonerRepository = use('App/Repositories/SummonerRepository');
const TierRepository = use('App/Repositories/TierRepository');

class SummonerService {
  constructor() {
    this.summonerRepository = new SummonerRepository();
    this.tierRepository = new TierRepository();
  }

  async show({ region, summonerName }) {
    const summoner = await this.summonerRepository.show(region, summonerName);

    return summoner;
  }

  async store({ region, summonerName }) {
    const summonerAPI = await getSummoner(region, summonerName);
    const summoner = await this.summonerRepository.store(summonerAPI, region);

    const tiers = await getTier(summonerAPI.id, region);
    const tierSolo = tiers[0];
    const tierFlex = tiers[1];

    if (tierSolo) {
      await this.tierRepository.store(summoner.id, region, tierSolo);
    }

    if (tierFlex) {
      await this.tierRepository.store(summoner.id, region, tierFlex);
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
