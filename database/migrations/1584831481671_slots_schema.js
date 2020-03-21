/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RunesSchema extends Schema {
  up() {
    this.create('runes', table => {
      table.increments();
      table.timestamps();
    });
  }

  down() {
    this.drop('runes');
  }
}

module.exports = RunesSchema;
