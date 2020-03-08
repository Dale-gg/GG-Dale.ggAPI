/* eslint-disable no-prototype-builtins */
/* eslint-disable no-continue */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
const getChampionUrl = 'ddragon.leagueoflegends.com/cdn';

const Axios = use('axios');

async function getAllChampions(version, language) {
  try {
    const champion = await Axios.get(
      `http://${getChampionUrl}/${version}/data/${language}/champion.json`
    );

    return champion.data.data;
  } catch (err) {
    return err;
  }
}

module.exports = getAllChampions;
