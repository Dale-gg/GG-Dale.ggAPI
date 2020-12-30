const SummonerService = use('App/Services/SummonerService');
const Antl = use('Antl');

class SummonerController {
  constructor() {
    this.summonerService = new SummonerService();
  }

  async show({ request, response }) {
    const summoner = await this.summonerService.show(request.get());

    if (!summoner) {
      return response.status(404).json({
        type: 'not-found-summoner',
        msg: Antl.formatMessage('response.not-found-summoner'),
        summoner,
      });
    }

    return response.status(200).json({
      type: 'get-summoner',
      msg: Antl.formatMessage('response.get-summoner'),
      summoner,
    });
  }

  async store({ request, response }) {
    const summoner = await this.summonerService.store(request.get());

    if (!summoner) {
      return response.status(404).json({
        type: 'not-found-summoner',
        msg: Antl.formatMessage('response.not-found-summoner'),
        summoner,
      });
    }

    if (summoner.status === 403) {
      return response.status(403).json({
        type: 'riot-api-offline',
        msg: Antl.formatMessage('response.riot-api-offline'),
      });
    }

    return response.status(200).json({
      type: 'get-summoner',
      msg: Antl.formatMessage('response.get-summoner'),
      summoner,
    });
  }

  async update({ request, response }) {
    const summoner = await this.summonerService.update(request.get());

    if (!summoner) {
      return response.status(404).json({
        type: 'not-found-summoner',
        msg: Antl.formatMessage('response.not-found-summoner'),
        summoner,
      });
    }

    return response.status(200).json({
      type: 'updated-summoner-profile',
      msg: Antl.formatMessage('response.updated-summoner-profile'),
      summoner,
    });
  }
}

module.exports = SummonerController;
