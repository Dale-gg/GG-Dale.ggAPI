/* eslint-disable guard-for-in */
const getMatchDtoUrl = '.api.riotgames.com/lol/match/v4/matches/';

const Env = use('Env');
const Axios = use('axios');

async function getMatchDto(region, gameId) {
  try {
    const apiResponse = await Axios.get(
      `https://${region}${getMatchDtoUrl}${gameId}${Env.get('RIOT_KEY')}`
    );

    const game = apiResponse.data;

    return game;
  } catch (err) {
    return err;
  }
}

module.exports = getMatchDto;
