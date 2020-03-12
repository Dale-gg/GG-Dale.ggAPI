/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ParticipantSpellSchema extends Schema {
  up() {
    this.create('participant_spell', table => {
      table.increments();
      table
        .integer('participant_id')
        .unsigned()
        .references('id')
        .inTable('participants')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('spell_id')
        .unsigned()
        .references('id')
        .inTable('spells')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('participant_spell');
  }
}

module.exports = ParticipantSpellSchema;
