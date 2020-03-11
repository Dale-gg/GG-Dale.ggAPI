/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ParticipantSpellsSchema extends Schema {
  up() {
    this.create('participant_spells', table => {
      table.increments();
      table
        .integer('participant_id')
        .unsigned()
        .references('id')
        .inTable('participants');
      table
        .integer('spell_id')
        .unsigned()
        .references('id')
        .inTable('spells');
      table.timestamps();
    });
  }

  down() {
    this.drop('participant_spells');
  }
}

module.exports = ParticipantSpellsSchema;
