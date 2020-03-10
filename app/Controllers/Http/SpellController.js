/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const SpellService = use('App/Services/SpellService');
const Antl = use('Antl');

class SpellController {
  constructor() {
    this.spellService = new SpellService();
  }

  async index({ response }) {
    const spells = await this.spellService.index();

    return response.status(200).json({
      type: 'success-all-spells',
      msg: Antl.formatMessage('response.success-all-spells'),
      spells,
    });
  }

  async store({ request, response }) {
    const spell = await this.spellService.store(request.all());

    return response.status(200).json({
      type: 'success-created-spell',
      msg: Antl.formatMessage('response.success-created-spell', {
        name: spell.name,
      }),
      spell,
    });
  }

  async show({ params, response }) {
    const spell = await this.spellService.show(params.spellName);

    return response.status(200).json({
      type: 'success-found-spell',
      msg: Antl.formatMessage('response.success-found-spell', {
        name: spell.name,
      }),
      spell,
    });
  }

  async update({ params, request, response }) {
    const spell = await this.spellService.update(
      params.spellName,
      request.all()
    );

    return response.status(200).json({
      type: 'success-updated-spell',
      msg: Antl.formatMessage('response.success-updated-spell', {
        name: spell.name,
      }),
      spell,
    });
  }

  async storeAll({ params, response }) {
    const spells = await this.spellService.storeAll(params);

    return response.status(200).json({
      type: 'success-created-allspells',
      msg: Antl.formatMessage('response.success-created-allspells'),
      spells,
    });
  }

  async updateAll({ params, response }) {
    const spells = await this.spellService.updateAll(params);

    return response.status(200).json({
      type: 'success-updated-allspells',
      msg: Antl.formatMessage('response.success-update-allspells'),
      spells,
    });
  }
}

module.exports = SpellController;
