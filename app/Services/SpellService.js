/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Spell = use('App/Models/Spell');

const SpellRepository = use('App/Repositories/SpellRepository');

const getAllSpells = require('../Utils/RiotAPI/getAllSpells');

const getSpell = require('../Utils/RiotAPI/getSpell');

class SpellService {
  constructor() {
    this.spellRepository = new SpellRepository();
  }

  async index() {
    const spells = await this.spellRepository.index();

    return spells;
  }

  async store({ gamePatch, language, spellName }) {
    const spellAPI = await getSpell(gamePatch, language, spellName);

    if (spellAPI.id == null || spellAPI.id === 'Error') {
      return null;
    }

    await this.spellRepository.store(spellAPI, gamePatch);

    const resSpell = await Spell.findBy({ name: spellName });

    return resSpell;
  }

  async show(spellName) {
    const spell = await this.spellRepository.show(spellName);

    return spell;
  }

  async update(spellName, { gamePatch, language }) {
    const spellAPI = await getSpell(gamePatch, language, spellName);

    if (spellAPI.id == null || spellAPI.id === 'Error') {
      return null;
    }

    await this.spellRepository.update(spellName, spellAPI, gamePatch);

    const resSpell = await Spell.findBy({ name: spellName });

    return resSpell;
  }

  async storeAll({ version, language }) {
    const spellsAPI = await getAllSpells(version, language);

    const promises = [];
    for (const spell in spellsAPI) {
      promises.push(this.spellRepository.storeAll(spellsAPI[spell], version));
    }
    await Promise.all(promises);

    const resSpells = await Spell.all();

    return resSpells;
  }

  async updateAll({ version, language }) {
    const spellsAPI = await getAllSpells(version, language);

    const promises = [];
    for (const spell in spellsAPI) {
      promises.push(this.spellRepository.updateAll(spellsAPI[spell], version));
    }
    await Promise.all(promises);

    const resSpells = await Spell.all();

    return resSpells;
  }
}

module.exports = SpellService;
