/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Participant = use('App/Models/Participant');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ParticipantDto = use('App/Models/ParticipantDto');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const MatchDto = use('App/Models/MatchDto');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Champion = use('App/Models/Champion');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Spell = use('App/Models/Spell');

class ParticipantRepository {
  async store(participantapi, participantIden, matchDto, gameId, i) {
    const match = await MatchDto.findByOrFail({
      id: matchDto,
    });

    const champion = await Champion.findByOrFail({
      key: participantapi.championId,
    });

    const spell1 = await Spell.findByOrFail({
      key: participantapi.spell1Id,
    });

    const spell2 = await Spell.findByOrFail({
      key: participantapi.spell2Id,
    });

    const participant = await Participant.create({
      team_id: participantapi.teamId,
      game_id: gameId,
      champion_id: champion.id,
      champion_key: participantapi.championId,
      account_id: participantIden[i].player.accountId,
      summoner_id: participantIden[i].player.summonerId,
      summoner_name: participantIden[i].player.summonerName,
      profile_icon: participantIden[i].player.profileIcon,
      participant_api_id: participantIden[i].participantId,
      match_dto_id: matchDto,
      highest_achieved_season_tier: 'rev',
    });

    // Items
    const participantdto = await ParticipantDto.create({
      participant_id: participant.id,
      participant_api_id: participantapi.participantId,
      perk0: participantapi.stats.perk0,
      perk1: participantapi.stats.perk1,
      perk2: participantapi.stats.perk2,
      perk3: participantapi.stats.perk3,
      perk4: participantapi.stats.perk4,
      perk5: participantapi.stats.perk5,
      item0: participantapi.stats.item0,
      item1: participantapi.stats.item1,
      item2: participantapi.stats.item2,
      item3: participantapi.stats.item3,
      item4: participantapi.stats.item4,
      item5: participantapi.stats.item5,
      kills: participantapi.stats.kills,
      deaths: participantapi.stats.deaths,
      assists: participantapi.stats.assists,
      win: participantapi.stats.win,
      double_kills: participantapi.stats.doubleKills,
      triple_kills: participantapi.stats.tripleKills,
      quadra_kills: participantapi.stats.quadraKills,
      penta_kills: participantapi.stats.pentaKills,
      champ_level: participantapi.stats.champLevel,
      turret_kills: participantapi.stats.turretKills,
      gold_earned: participantapi.stats.goldEarned,
      cs: participantapi.stats.totalMinionsKilled,
    });

    await match.participants().save(participant);
    await participant.spells().save(spell1);
    await participant.spells().save(spell2);
    await participant.participantdto().save(participantdto);
    await champion.participant().save(participant);
  }
}

module.exports = ParticipantRepository;
