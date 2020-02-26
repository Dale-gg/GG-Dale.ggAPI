const getSummonerUrl = '.api.riotgames.com/lol/summoner/v4/summoners/by-name/';

const Env = use('Env');
const Axios = use('axios');

async function getSummoner(region, summonerName) {
  try {
    const summoner = await Axios.get(
      `https://${region}${getSummonerUrl}${summonerName}${Env.get('RIOT_KEY')}`
    );

    return summoner.data;
  } catch (err) {
    return err;
  }
}

module.exports = getSummoner;
