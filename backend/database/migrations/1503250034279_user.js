/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments();
      table.string('avatar');
      table.string('name').notNullable();
      table.string('title');
      table.string('bio');
      table.string('github');
      table.string('linkedin');
      table
        .string('email')
        .notNullable()
        .unique();
      table.string('password').notNullable();
      table.boolean('email_confirmed').defaultTo(false);
      table.boolean('status').defaultTo(true);

      table.boolean('deleted').defaultTo(false);
      table.date('deleted_at');
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
