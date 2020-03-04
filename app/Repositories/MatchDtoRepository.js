/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const MatchDto = use('App/Models/MatchDto');

// const Database = use('Database');

class MatchDtoRepository {
  async store(matchDto) {
    const m = await MatchDto.create({
      season_id: matchDto.seasonId,
      queue_id: matchDto.queueId,
      game_id: matchDto.gameId,
      platform_id: matchDto.platformId,
    });

    return m;
  }
}

module.exports = MatchDtoRepository;
