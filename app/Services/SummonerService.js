/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Summoner = use('App/Models/Summoner');

const getSummoner = require('../Utils/RiotAPI/getSummoner');
const getTier = require('../Utils/RiotAPI/getTier');
const getMatchs = require('../Utils/RiotAPI/getMatchs');

const SummonerRepository = use('App/Repositories/SummonerRepository');
const TierRepository = use('App/Repositories/TierRepository');
const MatchRepository = use('App/Repositories/MatchRepository');

class SummonerService {
  constructor() {
    this.summonerRepository = new SummonerRepository();
    this.tierRepository = new TierRepository();
    this.matchRepository = new MatchRepository();
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
      this.tierRepository.store(summoner.id, region, tierSolo);
    }
    if (tierFlex) {
      this.tierRepository.store(summoner.id, region, tierFlex);
    }

    const matchListAPI = await getMatchs(region, summonerAPI.accountId);
    this.matchRepository.store(summonerAPI.accountId, region, matchListAPI);

    const resSummoner = await Summoner.query()
      .where({
        summoner_name: summonerName,
        region,
      })
      .with('tiers')
      .with('matchs.matchdto')
      .fetch();

    return resSummoner;
  }
}

module.exports = SummonerService;
