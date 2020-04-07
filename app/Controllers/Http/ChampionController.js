const ChampionService = use('App/Services/ChampionService');
const Antl = use('Antl');

class ChampionController {
  constructor() {
    this.championService = new ChampionService();
  }

  async index({ response }) {
    const champions = await this.championService.index();

    return response.status(200).json({
      type: 'success-all-champions',
      msg: Antl.formatMessage('response.success-all-champions'),
      champions,
    });
  }

  async show({ params, response }) {
    const champion = await this.championService.show(params.championName);

    if (!champion) {
      return response.status(404).json({
        type: 'api-not-found-champion',
        msg: Antl.formatMessage('response.api-not-found-champion'),
        champion,
      });
    }

    return response.status(200).json({
      type: 'success-found-champion',
      msg: Antl.formatMessage('response.success-found-champion', {
        name: champion.name,
      }),
      champion,
    });
  }

  async update({ params, request, response }) {
    const champion = await this.championService.update(params.championName);

    if (!champion) {
      return response.status(404).json({
        type: 'api-not-found',
        msg: Antl.formatMessage('response.api-not-found'),
      });
    }

    return response.status(200).json({
      type: 'success-updated-champion',
      msg: Antl.formatMessage('response.success-updated-champion', {
        name: champion.name,
      }),
      champion,
    });
  }

  async storeAll({ params, response }) {
    const champions = await this.championService.storeAll(params);

    return response.status(200).json({
      type: 'success-created-allchampions',
      msg: Antl.formatMessage('response.success-created-allchampions'),
      champions,
    });
  }

  async updateAll({ params, response }) {
    const champions = await this.championService.updateAll(params);

    return response.status(200).json({
      type: 'success-updated-allchampions',
      msg: Antl.formatMessage('response.success-updated-allchampions'),
      champions,
    });
  }
}

module.exports = ChampionController;
