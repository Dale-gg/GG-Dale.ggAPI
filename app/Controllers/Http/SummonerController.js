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

    return response.status(200).json({
      type: 'get-summoner',
      msg: Antl.formatMessage('response.get-summoner'),
      summoner,
    });

    // Nível banco de dados
    // for(var game in games) {
    //   const matchDto = await Axios.get(
    //       `https://${region}${getMatchDto}${games[game].gameId}${Env.get('RIOT_KEY')}`
    //   );
    // }
  }
}

module.exports = SummonerController;
