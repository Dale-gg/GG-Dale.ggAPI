/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TierSchema extends Schema {
  up() {
    this.create('tiers', table => {
      table.increments();
      table
        .integer('summoner_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('summoners')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('league_id').notNullable();
      table.string('queue_type').notNullable();
      table.string('tier').notNullable();
      table.string('rank').notNullable();
      table.integer('pdl').notNullable();
      table.string('winrate').notNullable();
      table.integer('wins').notNullable();
      table.integer('losses').notNullable();
      table.boolean('inactive').notNullable();
      table.boolean('veteran').notNullable();
      table.boolean('hot_streak').notNullable();
      table.boolean('fresh_blood').notNullable();
      table.string('season').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('tiers');
  }
}

module.exports = TierSchema;
