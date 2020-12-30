const { randomBytes } = require('crypto');
const { promisify } = require('util');

const Mail = use('Mail');
const Env = use('Env');
const Antl = use('Antl');
// Typescript Intellisense
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class ForgotPasswordController {
  async store({ request, response }) {
    const email = request.input('email');

    const user = await User.findByOrFail('email', email);

    const random = await promisify(randomBytes)(16);
    const token = random.toString('hex');

    await user.tokens().create({
      token,
      type: 'forgotpassword',
    });

    const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`;

    await Mail.send(
      'emails.forgotpassword',
      { name: user.name, resetPasswordUrl },
      message => {
        message
          .to(user.email)
          .from('token.dale.gg@gmail.com')
          .subject('RS/XP - Welcome to Rocketseat');
      }
    );

    return response.status(200).json({
      type: 'forgot-request',
      msg: Antl.formatMessage('response.forgot-request'),
    });
  }
}

module.exports = ForgotPasswordController;
