/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TreeSchema extends Schema {
  up() {
    this.create('trees', table => {
      table.increments();
      table.integer('id_api').notNullable();
      table.string('key').notNullable();
      table.string('icon').notNullable();
      table.string('name').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('runes');
  }
}

module.exports = TreeSchema;
