/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const RuneService = use('App/Services/RuneService');
const Antl = use('Antl');

class RuneController {
  constructor() {
    this.runeService = new RuneService();
  }

  async index({ response }) {
    const runes = await this.runeService.index();

    return response.status(200).json({
      type: 'success-all-runes',
      msg: Antl.formatMessage('response.success-all-runes'),
      runes,
    });
  }

  async storeAll({ response, params }) {
    const runes = await this.runeService.storeAll(params);

    return response.status(200).json({
      type: 'success-created-allrunes',
      msg: Antl.formatMessage('response.success-created-allrunes'),
      runes,
    });
  }

  async updateAll({ params, request, response }) {
  }

}

module.exports = RuneController;
