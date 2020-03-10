/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Spell = use('App/Models/Spell');

const getAllChampions = require('../Utils/RiotAPI/getAllChampions');

class SpellService {
  async index() {
    const champions = await this.championRepository.index();

    return champions;
  }

  async store({ gamePatch, language, spellName }) {
  }

  async show(spellName) {
  }

  async update(spellName, { gamePatch, language }) {
  }

  async storeAll({ version, language }) {
  }

  async updateAll({ version, language }) {
  }
}

module.exports = SpellService;
