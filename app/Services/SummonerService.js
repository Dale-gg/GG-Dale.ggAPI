/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Summoner = use('App/Models/Summoner');

const { LolApi } = use('@jlenon7/zedjs');

const getMatchs = use('App/Utils/RiotAPI/getMatchs');

const SummonerRepository = use('App/Repositories/SummonerRepository');
const TierRepository = use('App/Repositories/TierRepository');
const MatchRepository = use('App/Repositories/MatchRepository');

class SummonerService {
  constructor() {
    this.api = new LolApi();
    this.summonerRepository = new SummonerRepository();
    this.tierRepository = new TierRepository();
    this.matchRepository = new MatchRepository();
  }

  async show({ region, summonerName }) {
    const summoner = await this.summonerRepository.show(region, summonerName);

    return summoner;
  }

  async store({ region, summonerName }) {
    const { response: summonerAPI } = await this.api.Summoner.getByName(
      summonerName,
      region
    );

    if (summonerAPI.name == null || summonerAPI.name === 'Error') {
      return null;
    }

    const summoner = await this.summonerRepository.store(summonerAPI, region);

    const { response: tiers } = await this.api.League.bySummoner(
      summonerAPI.id,
      region
    );

    const tierSolo = tiers[0];
    const tierFlex = tiers[1];

    if (tierSolo) {
      this.tierRepository.store(summoner.id, region, tierSolo);
    }
    if (tierFlex) {
      this.tierRepository.store(summoner.id, region, tierFlex);
    }

    // PRODUCTION
    //
    // const matchListAPI = await this.api.Match.list(
    //   summonerAPI.accountId,
    //   region
    // );

    const matchListAPI = await getMatchs(summonerAPI.accountId, region);

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
      .whereRaw(`summoner_name ILIKE ? AND region = '${region}'`, summonerName)
      .with('tiers')
      .with('matchs.champion')
      .with('matchs.matchdto.participants.spells')
      .with('matchs.matchdto.participants.champion')
      .with('matchs.matchdto.participants.participantdto')
      .fetch();

    return resSummoner;
  }

  async update({ region, summonerName }) {
    const { response: summonerAPI } = await this.api.Summoner.getByName(
      summonerName,
      region
    );

    if (summonerAPI.name == null || summonerAPI.name === 'Error') {
      return null;
    }

    const summoner = await this.summonerRepository.update(summonerAPI, region);

    const { response: tiers } = await this.api.League.bySummoner(
      summonerAPI.id,
      region
    );

    const tierSolo = tiers[0];
    const tierFlex = tiers[1];

    if (tierSolo) {
      this.tierRepository.update(summoner.id, region, tierSolo);
    }
    if (tierFlex) {
      this.tierRepository.update(summoner.id, region, tierFlex);
    }

    // PRODUCTION
    //
    // const { response: matchListAPI } = await this.api.Match.list(
    //   summonerAPI.accountId,
    //   region
    // );

    const matchListAPI = await getMatchs(summonerAPI.accountId, region);

    const promises = [];
    for (const match in matchListAPI) {
      promises.push(
        this.matchRepository.store(
          summoner.account_id,
          region,
          matchListAPI[match]
        )
      );
    }
    await Promise.all(promises);

    const resSummoner = await Summoner.query()
      .whereRaw(`summoner_name ILIKE ? AND region = '${region}'`, summonerName)
      .with('tiers')
      .with('matchs.champion')
      .with('matchs.matchdto.participants.spells')
      .with('matchs.matchdto.participants.champion')
      .with('matchs.matchdto.participants.participantdto')
      .fetch();

    return resSummoner;
  }
}

module.exports = SummonerService;
