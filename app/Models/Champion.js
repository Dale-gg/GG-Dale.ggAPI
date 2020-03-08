/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Champion extends Model {
  matchlist() {
    return this.belongsTo('App/Models/Matchlist');
  }
}

module.exports = Champion;
