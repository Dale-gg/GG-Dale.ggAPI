/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TierSchema extends Schema {
  up() {
    this.create('tiers', table => {
      table.increments();
      table
        .integer('summoner_id')
        .unsigned()
        .references('id')
        .inTable('summoners')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('league_id');
      table.string('queue_type');
      table.string('tier');
      table.string('rank');
      table.integer('pdl');
      table.string('winrate');
      table.integer('wins');
      table.integer('losses');
      table.boolean('inactive');
      table.boolean('veteran');
      table.boolean('hot_streak');
      table.boolean('fresh_blood');
      table.string('season');
      table.timestamps();
    });
  }

  down() {
    this.drop('tiers');
  }
}

module.exports = TierSchema;
