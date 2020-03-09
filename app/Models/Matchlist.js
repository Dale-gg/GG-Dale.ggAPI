/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Matchlist extends Model {
  summoner() {
    return this.belongsTo('App/Models/Summoner');
  }

  matchdto() {
    return this.hasOne('App/Models/MatchDto');
  }

  champion() {
    return this.hasOne('App/Models/Champion');
  }
}

module.exports = Matchlist;
