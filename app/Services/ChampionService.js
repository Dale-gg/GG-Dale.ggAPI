/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Champion = use('App/Models/Champion');

const getChampion = require('../Utils/RiotAPI/getChampion');
const getAllChampions = require('../Utils/RiotAPI/getAllChampions');

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

  async show(championName) {
    const champion = await this.championRepository.show(championName);

    return champion;
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

  async storeAll({ version, language }) {
    const championsAPI = await getAllChampions(version, language);

    const promises = [];
    for (const champion in championsAPI) {
      promises.push(
        this.championRepository.storeAll(championsAPI[champion], version)
      );
    }
    await Promise.all(promises);

    const resChampions = await Champion.all();

    return resChampions;
  }

  async updateAll({ version, language }) {
    const championsAPI = await getAllChampions(version, language);

    const promises = [];
    for (const champion in championsAPI) {
      promises.push(
        this.championRepository.updateAll(championsAPI[champion], version)
      );
    }
    await Promise.all(promises);

    const resChampions = await Champion.all();
    console.log(resChampions);

    return resChampions;
  }
}

module.exports = ChampionService;
