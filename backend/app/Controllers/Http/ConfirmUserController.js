const { parseISO, isBefore, subHours } = require('date-fns');

// Typescript Intellisense
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Token = use('App/Models/Token');

class ConfirmUserController {
  async store({ request, response }) {
    const { token } = request.only(['token']);

    const userToken = await Token.findByOrFail('token', token);

    if (isBefore(parseISO(userToken.created_at), subHours(new Date(), 36000))) {
      return response
        .status(400)
        .json({ error: 'Invalid date range, please try again.' });
    }

    const user = await userToken.user().fetch();

    user.email_confirmed = true;

    await user.save();

    return response.status(204).json({ type: 'email_confirmed', msg: 'Your e-mail has been confirmed :)', user });
  }
}

module.exports = ConfirmUserController;