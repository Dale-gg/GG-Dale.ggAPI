/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Rune = use('App/Models/Rune');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Tree = use('App/Models/Tree');

class RuneRepository {
  async index() {
    const runes = await Rune.all();

    return runes;
  }

  async storeAll(trees) {
    const slots = trees.slots;
    const image_tree = `https://ddragon.leagueoflegends.com/cdn/img/${trees.icon}`;

    const tree = await Tree.create({
      id_api: trees.id,
      key: trees.key,
      icon: image_tree,
      name: trees.name,
    });

    for (const slot in slots) {
      const runes = slots[slot];
      for (const rune in runes) {
        const run = await Rune.create({
          id_api: runes[rune].id,
          key: runes[rune].key,
          icon: `https://ddragon.leagueoflegends.com/cdn/img/${runes[rune].icon}`,
          name: runes[rune].name,
          shortDesc: runes[rune].shortDesc,
          longDesc: runes[rune].longDesc,
        });

        await tree.runes().save(run);
      }
    }
  }
}

module.exports = RuneRepository;
