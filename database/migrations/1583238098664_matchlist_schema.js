/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MatchlistSchema extends Schema {
  up() {
    this.create('matchlists', table => {
      table.increments();
      table
        .integer('summoner_id')
        .unsigned()
        .references('id')
        .inTable('summoners');
      table
        .integer('champion_id')
        .unsigned()
        .references('id')
        .inTable('champions');
      table.string('game_id');
      table.string('platform_id');
      table.string('lane');
      table.integer('queue');
      table.string('role');
      table.integer('timestamp');
      table.integer('season');
      table.timestamps();
    });
  }

  down() {
    this.drop('matchlists');
  }
}

module.exports = MatchlistSchema;
