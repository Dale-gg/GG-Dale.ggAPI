/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SpellSchema extends Schema {
  up() {
    this.create('spells', table => {
      table.increments();
      table.string('name').notNullable();
      table.integer('key').notNullable();
      table.string('spell_dd').notNullable();
      table.string('description').notNullable();
      table.string('group');
      table.string('modes');
      table.string('image_full_url').notNullable();
      table.string('image_sprite_url').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('spells');
  }
}

module.exports = SpellSchema;
