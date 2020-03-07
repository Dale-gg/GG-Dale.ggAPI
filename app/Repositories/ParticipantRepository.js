/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Participant = use('App/Models/Participant');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const MatchDto = use('App/Models/MatchDto');

class ParticipantRepository {
  async store(participantapi, matchDto) {
    const match = await MatchDto.findByOrFail({
      id: matchDto,
    });

    try {
      const participant = await Participant.create({
        team_id: participantapi.teamId,
        game_id: participantapi.gameId,
        champ_id: participantapi.champId,
        account_id: participantapi.accountId,
        summoner_id: participantapi.summonerId,
        match_dto_id: matchDto.id,
        highest_achieved_season_tier: participantapi.highestAchievedSeasonTier,
      });

      await match.participants().save(participant);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ParticipantRepository;
