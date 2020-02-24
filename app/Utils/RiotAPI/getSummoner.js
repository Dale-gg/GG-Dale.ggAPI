const getSummonerUrl = '.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
// const getTierUrl = '.api.riotgames.com/lol/league/v4/entries/by-summoner/';
// const getMatchlistUrl = '.api.riotgames.com/lol/match/v4/matchlists/by-account/';
// const getMatchDto = '.api.riotgames.com/lol/match/v4/matches/';
const Env = use('Env');
const Axios = use('axios');

async function getSummoner (region, summonerName){
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

// async function getTier(id, region){
//     try {
//         const apiResponse = await Axios.get(
//             `https://${region}${getTierUrl}${id}${Env.get('RIOT_KEY')}`
//         );
        
//         return apiResponse.data;
//     } catch(err) {
//         console.log(err);
//     }
// }

// async function getMatchlist(region, accountId) {
//     try {
//         const apiResponse = await Axios.get(
//             `https://${region}${getMatchlistUrl}${accountId}${Env.get('RIOT_KEY')}&endIndex=10`
//         );

//         const games = apiResponse.data.matches;
        
//         for(var game in games) {
//             const matchDto = await Axios.get(
//                 `https://${region}${getMatchDto}${games[game].gameId}${Env.get('RIOT_KEY')}`
//             );
//         }

//         return games;
//     } catch(err) {
//         console.log(err);
//     }
// }

module.exports = getSummoner;
