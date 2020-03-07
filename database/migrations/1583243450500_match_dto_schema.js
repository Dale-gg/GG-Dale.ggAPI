/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MatchDtoSchema extends Schema {
  up() {
    this.create('match_dtos', table => {
      table.increments();
      table
        .integer('matchlist_id')
        .unsigned()
        .references('id')
        .inTable('matchlists');
      table.string('game_id');
      table.integer('season_id');
      table.integer('queue_id');
      table.string('game_mode');
      table.string('game_version');
      table.string('platform_id');
      table.integer('map_id');
      table.string('game_type');
      table.timestamps();
    });
  }

  down() {
    this.drop('match_dtos');
  }
}

module.exports = MatchDtoSchema;
