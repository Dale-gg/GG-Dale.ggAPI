/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ParticipantSchema extends Schema {
  up() {
    this.create('participants', table => {
      table.increments();
      table.integer('team_id');
      table.bigInteger('game_id');
      table.string('account_id');
      table.string('summoner_id');
      table
        .integer('champion_id')
        .unsigned()
        .references('id')
        .inTable('champions');
      table.integer('champion_key');
      table
        .integer('match_dto_id')
        .unsigned()
        .references('id')
        .inTable('match_dtos');
      table.string('highest_achieved_season_tier');
      table.timestamps();
    });
  }

  down() {
    this.drop('participants');
  }
}

module.exports = ParticipantSchema;
