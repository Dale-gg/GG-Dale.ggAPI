/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MatchDtoSchema extends Schema {
  up() {
    this.create('match_dtos', table => {
      table.increments();
      table
        .integer('matchlist_id')
        .unsigned()
        .notNullable()
        .unique()
        .references('id')
        .inTable('matchlists')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.integer('map_id').notNullable();
      table
        .string('game_id')
        .notNullable()
        .unique();
      table.integer('queue_id').notNullable();
      table.integer('season_id').notNullable();
      table.string('platform_id').notNullable();
      table.string('game_mode').notNullable();
      table.string('game_version').notNullable();
      table.string('game_type').notNullable();
      table.bigInteger('game_duration').notNullable();
      table.bigInteger('game_creation').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('match_dtos');
  }
}

module.exports = MatchDtoSchema;
