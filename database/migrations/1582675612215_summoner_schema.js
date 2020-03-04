/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SummonerSchema extends Schema {
  up() {
    this.create('summoners', table => {
      table.increments();
      table.string('account_id').notNullable();
      table.string('summoner_id').notNullable();
      table.string('puuid').notNullable();
      table.string('summoner_name').notNullable();
      table.string('region').notNullable();
      table.string('revision_date').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('summoners');
  }
}

module.exports = SummonerSchema;
