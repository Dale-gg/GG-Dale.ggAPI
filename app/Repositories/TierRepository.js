/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Summoner = use('App/Models/Summoner');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Tier = use('App/Models/Tier');

class TierRepository {
  async store(summonerId, summonerRegion, tier) {
    const summoner = await Summoner.findByOrFail({
      id: summonerId,
      region: summonerRegion,
    });

    const summonerTier = await Tier.create({
      summoner_id: summoner.id,
      league_id: tier.leagueId,
      queue_type: tier.queueType,
      tier: tier.tier,
      rank: tier.rank,
      pdl: tier.leaguePoints,
      wins: tier.wins,
      losses: tier.losses,
      winrate: tier.wins,
      inactive: tier.inactive,
      fresh_blood: tier.freshBlood,
      hot_streak: tier.hotStreak,
      veteran: tier.veteran,
      season: 10,
    });

    await summoner.tiers().save(summonerTier);
  }

  async update(summonerId, summonerRegion, tier) {
    await Tier.query()
      .where({ summoner_id: summonerId, region: summonerRegion })
      .update({
        summoner_id: summonerId,
        league_id: tier.leagueId,
        queue_type: tier.queueType,
        tier: tier.tier,
        rank: tier.rank,
        pdl: tier.leaguePoints,
        wins: tier.wins,
        losses: tier.losses,
        winrate: tier.wins,
        inactive: tier.inactive,
        fresh_blood: tier.freshBlood,
        hot_streak: tier.hotStreak,
        veteran: tier.veteran,
        season: 10,
      });
  }
}

module.exports = TierRepository;
