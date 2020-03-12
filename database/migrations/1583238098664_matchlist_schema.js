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
        .notNullable()
        .inTable('summoners')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('champion_id')
        .unsigned()
        .references('id')
        .notNullable()
        .inTable('champions')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
      table.integer('champion_key').notNullable();
      table
        .string('game_id')
        .notNullable()
        .unique();
      table.string('platform_id').notNullable();
      table.string('lane').notNullable();
      table.integer('queue').notNullable();
      table.string('role').notNullable();
      table.bigInteger('timestamp').notNullable();
      table.integer('season').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('matchlists');
  }
}

module.exports = MatchlistSchema;
