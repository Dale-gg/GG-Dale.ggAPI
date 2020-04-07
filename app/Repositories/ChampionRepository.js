/* eslint-disable camelcase */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Champion = use('App/Models/Champion');

class ChampionRepository {
  async index() {
    const champions = await Champion.all();

    return champions;
  }

  async show(championName) {
    const champion = await Champion.findBy({ name: championName });

    if (!champion) {
      return null;
    }

    return champion;
  }

  async update(championAPI) {
    const image_full = `http://ddragon.leagueoflegends.com/cdn/${championAPI.version}/img/champion/${championAPI.image.full}`;
    const image_splash = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championAPI.name}_0.jpg`;
    const image_loading = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championAPI.name}_0.jpg`;

    const champion = await Champion.findBy({ name: championAPI.name });

    champion.key = championAPI.key;
    champion.name = championAPI.name;
    champion.title = championAPI.title;
    champion.tags = championAPI.tags[0];
    champion.image_full_url = image_full;
    champion.image_splash_url = image_splash;
    champion.image_loading_url = image_loading;
    champion.image_sprite_url = championAPI.image.sprite;
    champion.version = championAPI.version;

    await champion.save();
  }

  async storeAll(championsAPI) {
    const image_full = `http://ddragon.leagueoflegends.com/cdn/${championsAPI.version}/img/champion/${championsAPI.image.full}`;
    const image_splash = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championsAPI.name}_0.jpg`;
    const image_loading = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championsAPI.name}_0.jpg`;

    await Champion.create({
      key: championsAPI.key,
      name: championsAPI.name,
      title: championsAPI.title,
      tags: championsAPI.tags[0],
      image_full_url: image_full,
      image_splash_url: image_splash,
      image_loading_url: image_loading,
      image_sprite_url: championsAPI.image.sprite,
      version: championsAPI.version,
    });
  }

  async updateAll(championsAPI) {
    const image_full = `http://ddragon.leagueoflegends.com/cdn/${championsAPI.version}/img/champion/${championsAPI.image.full}`;
    const image_splash = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championsAPI.name}_0.jpg`;
    const image_loading = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championsAPI.name}_0.jpg`;

    await Champion.query()
      .where('name', championsAPI.name)
      .update({
        key: championsAPI.key,
        name: championsAPI.name,
        title: championsAPI.title,
        tags: championsAPI.tags[0],
        image_full_url: image_full,
        image_splash_url: image_splash,
        image_loading_url: image_loading,
        image_sprite_url: championsAPI.image.sprite,
        version: championsAPI.version,
      });
  }
}

module.exports = ChampionRepository;
