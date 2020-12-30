/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Participant extends Model {
  matchdto() {
    return this.belongsTo('App/Models/MatchDto');
  }

  champion() {
    return this.belongsTo('App/Models/Champion');
  }

  participantdto() {
    return this.hasOne('App/Models/ParticipantDto');
  }

  spells() {
    return this.belongsToMany('App/Models/Spell');
  }
}

module.exports = Participant;
