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

  async store({ request, response }) {
    const champion = await this.championService.store(request.all());

    return response.status(200).json({
      type: 'success-created-champion',
      msg: Antl.formatMessage('response.success-created-champion', {
        name: champion.name,
      }),
      champion,
    });
  }

  async show({ params, request, response, view }) {
  }

  async update({ params, request, response }) {
  }

  async destroy({ params, request, response }) {
  }
}

module.exports = ChampionController;
