/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Champion = use('App/Models/Champion');

// const getChampion = require('../Utils/RiotAPI/getChampion');
// const getAllChampions = require('../Utils/RiotAPI/getAllChampions');

const { LolApi } = use('@jlenon7/zedjs');

const ChampionRepository = use('App/Repositories/ChampionRepository');

class ChampionService {
  constructor() {
    this.championRepository = new ChampionRepository();
    this.api = new LolApi();
  }

  async index() {
    const champions = await this.championRepository.index();

    return champions;
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

  async storeAll() {
    const { data } = await this.api.DataDragon.getChampion();

    const promises = [];
    for (const champion in data) {
      promises.push(this.championRepository.storeAll(data[champion]));
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

    return resChampions;
  }
}

module.exports = ChampionService;
