/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class MatchDto extends Model {
  matchlist() {
    return this.belongsTo('App/Models/Matchlist');
  }

  participants() {
    return this.hasMany('App/Models/Participant');
  }
}

module.exports = MatchDto;
