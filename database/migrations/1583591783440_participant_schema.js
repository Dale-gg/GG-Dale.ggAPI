/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ParticipantSchema extends Schema {
  up() {
    this.create('participants', table => {
      table.increments();
      table.integer('team_id').notNullable();
      table.bigInteger('game_id').notNullable();
      table.string('account_id').notNullable();
      table.string('summoner_id').notNullable();
      table
        .integer('champion_id')
        .unsigned()
        .references('id')
        .inTable('champions')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.integer('champion_key').notNullable();
      table
        .integer('match_dto_id')
        .unsigned()
        .references('id')
        .inTable('match_dtos')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('highest_achieved_season_tier').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('participants');
  }
}

module.exports = ParticipantSchema;
