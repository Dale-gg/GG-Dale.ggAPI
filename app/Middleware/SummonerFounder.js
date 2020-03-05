/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Summoner = use('App/Models/Summoner');

class SummonerFounder {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    const { region, summonerName } = request.get();

    // const summoner = await Summoner.query()
    //   .where({
    //     region,
    //     summoner_name: summonerName,
    //   })
    //   .fetch();

    const summoner = await Summoner.findBy({
      region,
      summoner_name: summonerName,
    });

    if (summoner) {
      await next();
    } else {
      return response.route(
        `/summoner/store?region=${region}&summonerName=${summonerName}`
      );
    }
  }
}

module.exports = SummonerFounder;
