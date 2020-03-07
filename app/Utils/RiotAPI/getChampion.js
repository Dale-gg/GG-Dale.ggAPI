/* eslint-disable no-prototype-builtins */
/* eslint-disable no-continue */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
const getChampionUrl = 'ddragon.leagueoflegends.com/cdn';

const Axios = use('axios');

async function getChampion(gamePatch, language, championName) {
  try {
    const champion = await Axios.get(
      `http://${getChampionUrl}/${gamePatch}/data/${language}/champion/${championName}.json`
    );

    const champ = champion.data.data[championName];

    return champ;
  } catch (err) {
    return err;
  }
}

module.exports = getChampion;
