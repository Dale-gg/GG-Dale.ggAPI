/* eslint-disable camelcase */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Spell = use('App/Models/Spell');

class SpellRepository {
  async index() {
    const spells = await Spell.all();

    return spells;
  }

  async store(spellAPI, gamePatch) {
    const image_full = `http://ddragon.leagueoflegends.com/cdn/${gamePatch}/img/spell/${spellAPI.image.full}`;

    const spell = await Spell.create({
      name: spellAPI.name,
      key: spellAPI.key,
      spell_dd: spellAPI.id,
      description: spellAPI.description,
      group: spellAPI.group,
      modes: spellAPI.modes,
      image_full_url: image_full,
      image_sprite_url: spellAPI.image.sprite,
    });

    return spell;
  }

  async show(spellName) {
    const spell = await Spell.findBy({ name: spellName });

    if (!spell) {
      return null;
    }

    return spell;
  }

  async update(spellName, spellAPI, gamePatch) {
    const image_full = `http://ddragon.leagueoflegends.com/cdn/${gamePatch}/img/spell/${spellAPI.image.full}`;

    await Spell.query()
      .where('name', spellName)
      .update({
        name: spellAPI.name,
        key: spellAPI.key,
        spell_dd: spellAPI.id,
        description: spellAPI.description,
        group: spellAPI.group,
        modes: spellAPI.modes,
        image_full_url: image_full,
        image_sprite_url: spellAPI.image.sprite,
      });
  }

  async storeAll(spellsAPI, gamePatch) {
    const image_full = `http://ddragon.leagueoflegends.com/cdn/${gamePatch}/img/spell/${spellsAPI.image.full}`;

    await Spell.create({
      name: spellsAPI.name,
      key: spellsAPI.key,
      spell_dd: spellsAPI.id,
      description: spellsAPI.description,
      group: spellsAPI.group,
      modes: spellsAPI.modes,
      image_full_url: image_full,
      image_sprite_url: spellsAPI.image.sprite,
    });
  }

  async updateAll(spellsAPI, gamePatch) {
    const image_full = `http://ddragon.leagueoflegends.com/cdn/${gamePatch}/img/spell/${spellsAPI.image.full}`;

    await Spell.query()
      .where('name', spellsAPI.name)
      .update({
        name: spellsAPI.name,
        key: spellsAPI.key,
        spell_dd: spellsAPI.id,
        description: spellsAPI.description,
        group: spellsAPI.group,
        modes: spellsAPI.modes,
        image_full_url: image_full,
        image_sprite_url: spellsAPI.image.sprite,
      });
  }
}

module.exports = SpellRepository;
