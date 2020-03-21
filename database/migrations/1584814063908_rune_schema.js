/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RuneSchema extends Schema {
  up() {
    this.create('runes', table => {
      table.increments();
      table.integer('id_api').notNullable();
      table.string('key').notNullable();
      table.string('icon').notNullable();
      table.string('name').notNullable();
      table.integer('slots_id');
      table.timestamps();
    });
  }

  down() {
    this.drop('runes');
  }
}

module.exports = RuneSchema;
