/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Participant = use('App/Models/Participant');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ParticipantDto = use('App/Models/ParticipantDto');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const MatchDto = use('App/Models/MatchDto');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Champion = use('App/Models/Champion');

class ParticipantRepository {
  async store(participantapi, matchDto) {
    const match = await MatchDto.findByOrFail({
      id: matchDto,
    });

    const champion = await Champion.findByOrFail({
      key: participantapi.champId,
    });

    try {
      const participant = await Participant.create({
        team_id: participantapi.teamId,
        game_id: participantapi.gameId,
        champion_id: champion.id,
        champion_key: participantapi.champId,
        account_id: participantapi.accountId,
        summoner_id: participantapi.summonerId,
        match_dto_id: matchDto.id,
        highest_achieved_season_tier: participantapi.highestAchievedSeasonTier,
      });

      const participantdto = await ParticipantDto.create({
        participant_id: participant.id,
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
      });

      await champion.participant().save(participant);
      await match.participants().save(participant);
      await participant.participantdto().save(participantdto);
    } catch (err) {
      return err;
    }
  }
}

module.exports = ParticipantRepository;
