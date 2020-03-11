/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SpellSchema extends Schema {
  up() {
    this.create('spells', table => {
      table.increments();
      table.string('name');
      table.integer('key');
      table.string('spell_dd');
      table.string('description');
      table.string('group');
      table.string('modes');
      table.string('image_full_url');
      table.string('image_sprite_url');
      table.timestamps();
    });
  }

  down() {
    this.drop('spells');
  }
}

module.exports = SpellSchema;
