/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
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

    if (summonerAPI.name == null || summonerAPI.name === 'Error') {
      return null;
    }

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

    const promises = [];
    for (const match in matchListAPI) {
      promises.push(
        this.matchRepository.store(
          summonerAPI.accountId,
          region,
          matchListAPI[match]
        )
      );
    }
    await Promise.all(promises);

    const resSummoner = await Summoner.query()
      .whereRaw(`summoner_name LIKE ? AND region = '${region}'`, summonerName)
      .with('tiers')
      .with('matchs.matchdto.participants.participantdto')
      .fetch();

    return resSummoner;
  }
}

module.exports = SummonerService;
