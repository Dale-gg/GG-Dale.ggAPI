/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Tree extends Model {
  runes() {
    return this.hasMany('App/Models/Rune');
  }
}

module.exports = Tree;
