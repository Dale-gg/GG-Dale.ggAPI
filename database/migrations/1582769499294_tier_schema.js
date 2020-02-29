/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TierSchema extends Schema {
  up() {
    this.create('tiers', table => {
      table.increments();
      table
        .string('summonerId')
        .unsigned()
        .references('summonerId')
        .inTable('summoners');
      table.string('leagueId');
      table.string('queueType');
      table.string('tier');
      table.string('rank');
      table.integer('pdl');
      table.string('winrate');
      table.integer('wins');
      table.integer('losses');
      table.boolean('inactive');
      table.boolean('veteran');
      table.boolean('hotStreak');
      table.boolean('freshBlood');
      table.string('season');
      table.timestamps();
    });
  }

  down() {
    this.drop('tiers');
  }
}

module.exports = TierSchema;
