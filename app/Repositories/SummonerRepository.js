/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Summoner = use('App/Models/Summoner');

const deleteOldMatchs = require('../Utils/RiotAPI/deleteOldMatchs');

class SummonerRepository {
  async show(region, summonerName) {
    const deleteMatchs = await deleteOldMatchs();
    console.log(deleteMatchs);

    const summoner = await Summoner.query()
      .whereRaw(`summoner_name LIKE ? AND region = '${region}'`, summonerName)
      .with('tiers')
      .with('matchs.champion')
      .with('matchs.matchdto.participants.spells')
      .with('matchs.matchdto.participants.champion')
      .with('matchs.matchdto.participants.participantdto')
      .fetch();

    return summoner;
  }

  async store(summonerAPI, region) {
    const summoner = await Summoner.create({
      account_id: summonerAPI.accountId,
      summoner_id: summonerAPI.id,
      puuid: summonerAPI.puuid,
      region,
      summoner_name: summonerAPI.name,
      revision_date: summonerAPI.revisionDate,
    });
    return summoner;
  }

  async update(summonerAPI, region) {
    const summoner = await Summoner.query()
      .where('summoner_id', summonerAPI.id)
      .update({
        account_id: summonerAPI.accountId,
        summoner_id: summonerAPI.id,
        puuid: summonerAPI.puuid,
        region,
        summoner_name: summonerAPI.name,
        revision_date: summonerAPI.revisionDate,
      });
    return summoner;
  }
}

module.exports = SummonerRepository;
