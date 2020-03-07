/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ParticipantDto extends Model {
  participant() {
    return this.belongsTo('App/Models/Participant');
  }
}

module.exports = ParticipantDto;
