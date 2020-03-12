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
        .notNullable()
        .inTable('participants')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.integer('perk0').notNullable();
      table.integer('perk1').notNullable();
      table.integer('perk2').notNullable();
      table.integer('perk3').notNullable();
      table.integer('perk4').notNullable();
      table.integer('perk5').notNullable();
      table.integer('item0').notNullable();
      table.integer('item1').notNullable();
      table.integer('item2').notNullable();
      table.integer('item3').notNullable();
      table.integer('item4').notNullable();
      table.integer('item5').notNullable();
      table.integer('kills').notNullable();
      table.integer('deaths').notNullable();
      table.integer('assists').notNullable();
      table.boolean('win').notNullable();
      table.integer('double_kills').notNullable();
      table.integer('triple_kills').notNullable();
      table.integer('quadra_kills').notNullable();
      table.integer('penta_kills').notNullable();
      table.integer('champ_level').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('participant_dtos');
  }
}

module.exports = ParticipantDtoSchema;
