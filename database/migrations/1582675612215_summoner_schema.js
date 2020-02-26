/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SummonerSchema extends Schema {
  up() {
    this.create('summoners', table => {
      table.increments();
      table.string('accountId').notNullable();
      table.string('summonerId').notNullable();
      table.string('puuid').notNullable();
      table.string('summonerName').notNullable();
      table.date('revisionDate').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('summoners');
  }
}

module.exports = SummonerSchema;
