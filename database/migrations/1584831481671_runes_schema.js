/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RunesSchema extends Schema {
  up() {
    this.create('runes', table => {
      table.increments();
      table.integer('id_api');
      table
        .integer('tree_id')
        .unsigned()
        .references('id')
        .inTable('tree')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('key');
      table.string('icon');
      table.string('name');
      table.string('shortDesc');
      table.string('longDesc');
      table.timestamps();
    });
  }

  down() {
    this.drop('runes');
  }
}

module.exports = RunesSchema;
