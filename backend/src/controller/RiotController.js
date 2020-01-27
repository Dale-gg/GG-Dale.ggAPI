const axios = require('axios');
require('dotenv').config({path: ".env"});

module.exports = {
    async index(request, response) {
        const { invocador } = request.body;

        const riotResponse = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${invocador}?api_key=${process.env.RIOT_API}`);
        
        let { accountId, name, profileIcon, summonerLevel, revisionDate } = riotResponse.data;

        inv = await {
            accountId,
            name,
            profileIcon,
            summonerLevel,
            revisionDate
        };

        return response.json(inv);
    }
}