const { parseISO, isBefore, subHours } = require('date-fns');

// Typescript Intellisense
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Token = use('App/Models/Token');

const Antl = use('Antl');

class ConfirmUserController {
  async store({ request, response }) {
    const { token } = request.only(['token']);

    const userToken = await Token.findByOrFail('token', token);

    if (isBefore(parseISO(userToken.created_at), subHours(new Date(), 36000))) {
      return response.status(400).json({
        type: 'error-time-token',
        msg: Antl.formatMessage('response.error-time-token'),
      });
    }

    const user = await userToken.user().fetch();

    user.email_confirmed = true;

    await user.save();

    return response.status(204).json({
      type: 'email-confirmed',
      msg: Antl.formatMessage('response.email-confirmed'),
      user,
    });
  }
}

module.exports = ConfirmUserController;
