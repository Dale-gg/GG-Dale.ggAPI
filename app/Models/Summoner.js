/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Summoner extends Model {
  tiers() {
    return this.hasMany('App/Models/Tier');
  }
}

module.exports = Summoner;
