/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Summoner = use('App/Models/Summoner');

const { LolApi } = use('@jlenon7/zedjs');

const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/SummonerMatchlist');

const SummonerRepository = use('App/Repositories/SummonerRepository');
const TierRepository = use('App/Repositories/TierRepository');

class SummonerService {
  constructor() {
    this.api = new LolApi();
    this.summonerRepository = new SummonerRepository();
    this.tierRepository = new TierRepository();
  }

  async show({ region, summonerName }) {
    const summoner = await this.summonerRepository.show(region, summonerName);

    return summoner;
  }

  async store({ region, summonerName }) {
    try {
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
        await this.tierRepository.store(summoner.id, region, tierSolo);
      }
      if (tierFlex) {
        await this.tierRepository.store(summoner.id, region, tierFlex);
      }

      // Call to matchlist queue
      Bull.add(Job.key, { summonerAPI, region });

      const resSummoner = await Summoner.query()
        .whereRaw(
          `summoner_name ILIKE ? AND region = '${region}'`,
          summonerName
        )
        .with('tiers')
        .with('matchs.champion')
        .with('matchs.matchdto.participants.spells')
        .with('matchs.matchdto.participants.champion')
        .with('matchs.matchdto.participants.participantdto')
        .fetch();

      return resSummoner;
    } catch (err) {
      return err;
    }
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

    // Call to matchlist queue
    Bull.add(Job.key, { summonerAPI, region });

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
