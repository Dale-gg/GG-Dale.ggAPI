/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Spell extends Model {
  participants() {
    return this.belongsToMany('App/Models/Participant');
  }
}

module.exports = Spell;
