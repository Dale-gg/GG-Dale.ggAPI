/* eslint-disable guard-for-in */
const getMatchlistUrl = '.api.riotgames.com/lol/match/v4/matchlists/by-account/';
const getMatchDto = '.api.riotgames.com/lol/match/v4/matches/';

const Env = use('Env');
const Axios = use('axios');

async function getMatch(region, accountId) {
  try {
    const apiResponse = await Axios.get(
      `https://${region}${getMatchlistUrl}${accountId}${Env.get(
        'RIOT_KEY'
      )}&endIndex=10`
    );

    const games = apiResponse.data.matches;

    // eslint-disable-next-line no-restricted-syntax
    for (const game in games) {
      Axios.get(
        `https://${region}${getMatchDto}${games[game].gameId}${Env.get(
          'RIOT_KEY'
        )}`
      );
    }

    return games;
  } catch (err) {
    return err;
  }
}

module.exports = getMatch;
