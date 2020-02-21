const Axios = use('axios');

const Env = use('Env');

class RiotApiController {
  async index({ response, params }) {
    const summonerUrl = '.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
    const { region, summonerName } = params;

    try {
      const apiResponse = await Axios.get(
        `https://${region}${summonerUrl}${summonerName}${Env.get('RIOT_KEY')}`
      );
      const { data } = apiResponse;

      return response
        .status(200)
        .json({ type: 'request-okay', msg: 'Summoner found!', data });
    } catch (err) {
      if (err) {
        return response
          .status(404)
          .json({ type: 'not-found', msg: 'Summoner not found :(', err });
      }
    }
  }
}

module.exports = RiotApiController;
