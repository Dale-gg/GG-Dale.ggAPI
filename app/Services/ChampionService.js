/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Champion = use('App/Models/Champion');

const getChampion = require('../Utils/RiotAPI/getChampion');

const ChampionRepository = use('App/Repositories/ChampionRepository');

class ChampionService {
  constructor() {
    this.championRepository = new ChampionRepository();
  }

  async index() {
    const champions = await this.championRepository.index();

    return champions;
  }

  async store({ gamePatch, language, championName }) {
    const championAPI = await getChampion(gamePatch, language, championName);

    if (championAPI.id == null || championAPI.id === 'Error') {
      return null;
    }

    await this.championRepository.store(championAPI, gamePatch);

    const resChampion = await Champion.findBy({ name: championName });

    return resChampion;
  }

  async update(championName, { gamePatch, language }) {
    const championAPI = await getChampion(gamePatch, language, championName);

    if (championAPI.id == null || championAPI.id === 'Error') {
      return null;
    }

    await this.championRepository.update(championName, championAPI, gamePatch);

    const resChampion = await Champion.findBy({ name: championName });

    return resChampion;
  }
}

module.exports = ChampionService;
