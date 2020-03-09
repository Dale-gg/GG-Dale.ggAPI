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
      table.string('game_id');
      table.string('platform_id');
      table.integer('champion_key');
      table.string('lane');
      table.integer('queue');
      table.string('role');
      table.bigInteger('timestamp');
      table.integer('season');
      table.timestamps();
    });
  }

  down() {
    this.drop('matchlists');
  }
}

module.exports = MatchlistSchema;
