/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database');

class SummonerFounder {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    const { region, summonerName } = request.get();

    const summoner = await Database.from('summoners').whereRaw(
      `summoner_name ILIKE ? AND region = '${region}'`,
      summonerName
    );

    if (summoner[0]) {
      await next();
    } else {
      return response.route(
        `/summoner/store?region=${region}&summonerName=${summonerName}`
      );
    }
  }
}

module.exports = SummonerFounder;
