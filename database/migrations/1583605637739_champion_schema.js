/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ChampionSchema extends Schema {
  up() {
    this.create('champions', table => {
      table.increments();
      table.integer('key');
      table.string('name');
      table.string('title');
      table.string('tags');
      table.string('version');
      table.string('image_full_url');
      table.string('image_splash_url');
      table.string('image_loading_url');
      table.string('image_sprite_url');
      table.timestamps();
    });
  }

  down() {
    this.drop('champions');
  }
}

module.exports = ChampionSchema;
