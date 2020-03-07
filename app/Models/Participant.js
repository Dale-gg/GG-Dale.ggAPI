/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Participant extends Model {
  matchdto() {
    return this.belongsTo('App/Models/MatchDto');
  }
}

module.exports = Participant;
