/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Tree = use('App/Models/Tree');
const { LolApi } = use('@jlenon7/zedjs');

const RuneRepository = use('App/Repositories/RuneRepository');

class RuneService {
  constructor() {
    this.runeRepository = new RuneRepository();
    this.api = new LolApi();
  }

  async index() {
    const runes = await this.runeRepository.index();

    return runes;
  }

  async storeAll() {
    const trees = await this.api.DataDragon.getRunesReforged();

    const promises = [];
    for (const tree in trees) {
      promises.push(this.runeRepository.storeAll(trees[tree]));
    }
    await Promise.all(promises);

    const resRunes = await Tree.query()
      .with('runes')
      .fetch();

    return resRunes;
  }
}

module.exports = RuneService;
