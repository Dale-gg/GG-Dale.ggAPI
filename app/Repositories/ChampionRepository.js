/* eslint-disable camelcase */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Champion = use('App/Models/Champion');

class ChampionRepository {
  async index() {
    const champions = await Champion.all();

    return champions;
  }

  async store(championAPI, gamePatch) {
    const image_full = `http://ddragon.leagueoflegends.com/cdn/${gamePatch}/img/champion/${championAPI.image.full}`;
    const image_splash = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championAPI.name}_0.jpg`;
    const image_loading = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championAPI.name}_0.jpg`;

    const champion = await Champion.create({
      key: championAPI.key,
      name: championAPI.name,
      title: championAPI.title,
      tags: championAPI.tags,
      image_full_url: image_full,
      image_splash_url: image_splash,
      image_loading_url: image_loading,
      image_sprite_url: championAPI.image.sprite,
      version: gamePatch,
    });

    return champion;
  }

  async update(championName, championAPI, gamePatch) {
    const champion = await Champion.findBy({ name: championName });

    champion.merge(championAPI);
    champion.save();
    console.log(champion);
  }
}

module.exports = ChampionRepository;
