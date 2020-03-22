/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Rune extends Model {
  tree() {
    return this.belongsTo('App/Models/Tree');
  }
}

module.exports = Rune;
