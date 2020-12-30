/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ChampionSchema extends Schema {
  up() {
    this.create('champions', table => {
      table.increments();
      table
        .integer('key')
        .notNullable()
        .unique();
      table
        .string('name')
        .notNullable()
        .unique();
      table.string('title').notNullable();
      table.string('tags').notNullable();
      table.string('version').notNullable();
      table.string('image_full_url').notNullable();
      table.string('image_splash_url').notNullable();
      table.string('image_loading_url').notNullable();
      table.string('image_sprite_url').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('champions');
  }
}

module.exports = ChampionSchema;
