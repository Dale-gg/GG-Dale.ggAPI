/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SpellSchema extends Schema {
  up() {
    this.create('spells', table => {
      table.increments();
      table.timestamps();
    });
  }

  down() {
    this.drop('spells');
  }
}

module.exports = SpellSchema;
