const { parseISO, isBefore, subHours } = require('date-fns');

// Typescript Intellisense
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Token = use('App/Models/Token');

const Antl = use('Antl');

class ResetPasswordController {
  async store({ request, response }) {
    const { token, password } = request.only(['token', 'password']);

    const userToken = await Token.findByOrFail('token', token);

    if (isBefore(parseISO(userToken.created_at), subHours(new Date(), 2))) {
      return response.status(400).json({
        type: 'error-time-token',
        msg: Antl.formatMessage('response.error-time-token'),
      });
    }

    const user = await userToken.user().fetch();

    user.password = password;

    await user.save();

    return response.status(204).json({
      type: 'password-reset',
      msg: Antl.formatMessage('response.password-reset'),
    });
  }
}

module.exports = ResetPasswordController;
