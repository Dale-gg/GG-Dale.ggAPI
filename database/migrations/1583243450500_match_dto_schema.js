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
      table.integer('map_id');
      table.string('game_id');
      table.integer('queue_id');
      table.integer('season_id');
      table.string('platform_id');
      table.string('game_mode');
      table.string('game_version');
      table.string('game_type');
      table.bigInteger('game_duration');
      table.bigInteger('game_creation');
      table.timestamps();
    });
  }

  down() {
    this.drop('match_dtos');
  }
}

module.exports = MatchDtoSchema;
