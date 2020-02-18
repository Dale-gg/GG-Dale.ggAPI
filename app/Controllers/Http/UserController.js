// Typescript Intellisense
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const Database = use('Database');
const Mail = use('Mail');
const Env = use('Env');
const Antl = use('Antl');

const { randomBytes } = require('crypto');
const { promisify } = require('util');

class UserController {
  async index({ response }) {
    const users = await Database.select('*').from('users');

    return response.status(200).json({
      type: 'success-all-users',
      msg: Antl.formatMessage('response.success-all-users'),
      users,
    });
  }

  async store({ request, response }) {
    const { name, email, password } = request.only([
      'name',
      'email',
      'password',
    ]);

    const avatar = 'initAvatar213029dsa30129dsa4012453953kvfkdjt.jpeg';

    const user = await User.create({
      name,
      avatar,
      email,
      password,
    });

    const random = await promisify(randomBytes)(16);
    const token = random.toString('hex');

    await user.tokens().create({
      token,
      type: 'confirmaccount',
    });

    const confirmAccountUrl = `${Env.get('APP_URL')}/confirm?token=${token}`;
    const subject = Antl.formatMessage('response.welcome');

    // He is not returning this response
    response.status(204).json({
      type: 'success-register',
      msg: Antl.formatMessage('response.success-register', { name: user.name }),
    });

    await Mail.send(
      'emails.confirm',
      { name: user.name, confirmAccountUrl },
      message => {
        message
          .to(user.email)
          .from('Dale.gg')
          .subject(subject);
      }
    );
  }

  async destroy({ response, params }) {
    const { id } = params;

    const user = await User.findBy({
      id,
    });

    await user.delete();
    user.deleted = true;
    user.status = false;

    await user.save();

    return response.status(200).json({
      type: 'user-soft-deleted',
      msg: Antl.formatMessage('response.user-soft-deleted', { id }),
      user,
    });
  }

  async restore({ response, params }) {
    const { id } = params;

    await Database.table('users')
      .where('id', id)
      .update({ deleted_at: null, deleted: false, status: true });

    const user = await Database.table('users').where('id', id);

    return response.status(200).json({
      type: 'user-soft-restored',
      msg: Antl.formatMessage('response.user-soft-restored', { id }),
      user,
    });
  }
}

module.exports = UserController;
