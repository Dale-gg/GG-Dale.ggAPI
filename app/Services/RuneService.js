/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Rune = use('App/Models/Rune');

const RuneRepository = use('App/Repositories/RuneRepository');

class RuneService {
  constructor() {
    this.runeRepository = new RuneRepository();
  }

  async index() {
    const runes = await this.runeRepository.index();

    return runes;
  }
}

module.exports = RuneService;
