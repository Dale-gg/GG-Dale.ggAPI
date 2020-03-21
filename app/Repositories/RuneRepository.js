/* eslint-disable camelcase */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Rune = use('App/Models/Rune');

class RuneRepository {
  async index() {
    const runes = await Rune.all();

    return runes;
  }
}

module.exports = RuneRepository;
