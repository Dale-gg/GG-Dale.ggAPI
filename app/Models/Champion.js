/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Champion extends Model {
  matchlist() {
    return this.hasOne('App/Models/Matchlist');
  }

  participant() {
    return this.hasOne('App/Models/Participant');
  }
}

module.exports = Champion;
