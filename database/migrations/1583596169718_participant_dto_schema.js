/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ParticipantDtoSchema extends Schema {
  up() {
    this.create('participant_dtos', table => {
      table.increments();
      table
        .integer('participant_id')
        .unsigned()
        .references('id')
        .inTable('participants');
      table.integer('perk0');
      table.integer('perk1');
      table.integer('perk2');
      table.integer('perk3');
      table.integer('perk4');
      table.integer('perk5');
      table.integer('item0');
      table.integer('item1');
      table.integer('item2');
      table.integer('item3');
      table.integer('item4');
      table.integer('item5');
      table.integer('kills');
      table.integer('deaths');
      table.integer('assists');
      table.boolean('win');
      table.integer('double_kills');
      table.integer('triple_kills');
      table.integer('quadra_kills');
      table.integer('penta_kills');
      table.integer('champ_level');
      table.timestamps();
    });
  }

  down() {
    this.drop('participant_dtos');
  }
}

module.exports = ParticipantDtoSchema;
