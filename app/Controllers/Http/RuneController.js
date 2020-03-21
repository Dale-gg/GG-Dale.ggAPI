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

  async store ({ request, response }) {
  }

  async show ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = RuneController;
