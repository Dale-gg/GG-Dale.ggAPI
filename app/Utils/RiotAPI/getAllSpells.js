/* eslint-disable no-prototype-builtins */
/* eslint-disable no-continue */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
const getSpellUrl = 'ddragon.leagueoflegends.com/cdn';

const Axios = use('axios');

async function getAllSpells(version, language) {
  try {
    const spell = await Axios.get(
      `http://${getSpellUrl}/${version}/data/${language}/summoner.json`
    );

    return spell.data.data;
  } catch (err) {
    return err;
  }
}

module.exports = getAllSpells;
