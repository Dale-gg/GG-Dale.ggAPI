const getTierUrl = '.api.riotgames.com/lol/league/v4/entries/by-summoner/';

const Env = use('Env');
const Axios = use('axios');

async function getTier(id, region){
    try {
        const tier = await Axios.get(
            `https://${region}${getTierUrl}${id}${Env.get('RIOT_KEY')}`
        );
        
        return tier.data;
    } catch(err) {
        return err;
    }
}

module.exports = getTier;