const getSummonerUrl = '.api.riotgames.com/lol/summoner/v4/summoners/by-name/';

const Env = use('Env');
const Axios = use('axios');

async function getSummoner(region, summonerName){
    try {
        const summoner = await Axios.get(
            `https://${region}${getSummonerUrl}${summonerName}${Env.get('RIOT_KEY')}`
        );
        //id q7kJ4LOHcfyzVsBLSlgPo1K6_zAIH3HLsMRTpVtxOzLFPZ8
        //accid YvD7kdf0_wCwAArq4rOSeOuS87I2iDdUlGwSow5XnhkTXYhqMUrDA6Ke
       
        //const tier = await getTier(apiResponse.data.id, region);  
        //const matchs = await getMatchlist(region, apiResponse.data.accountId);

        //const eloSolo = tier[0];
        
        return summoner.data;
    } catch(err) {
        return err;
    }
}

module.exports = getSummoner;
