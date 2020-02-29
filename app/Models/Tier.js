/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Tier extends Model {
  summoner() {
    return this.belongsTo('App/Models/Summoner');
  }
}

module.exports = Tier;
