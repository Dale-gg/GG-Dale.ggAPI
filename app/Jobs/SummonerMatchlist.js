/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

const getMatchs = use('App/Utils/RiotAPI/getMatchs');
const MatchRepository = use('App/Repositories/MatchRepository');

class SummonerMatchlist {
  constructor() {
    this.matchRepository = new MatchRepository();
  }

  static get key() {
    return 'SummonerMatchlist-key';
  }

  async handle(job) {
    const { data } = job;

    // PRODUCTION
    //
    // const matchListAPI = await this.api.Match.list(
    //   summonerAPI.accountId,
    //   region
    // );

    const matchListAPI = await getMatchs(
      data.summonerAPI.accountId,
      data.region
    );

    const promises = [];
    for (const match in matchListAPI) {
      promises.push(
        this.matchRepository.store(
          data.summonerAPI.accountId,
          data.region,
          matchListAPI[match]
        )
      );
    }
    await Promise.all(promises);

    return data;
  }
}

module.exports = SummonerMatchlist;
