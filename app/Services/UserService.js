// Typescript Intellisense
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const Database = use('Database');
const Mail = use('Mail');
const Env = use('Env');
const Antl = use('Antl');

const { randomBytes } = require('crypto');
const { promisify } = require('util');

class UserService {
  async index() {
    const users = await Database.select('*').from('users');

    return users;
  }

  async store({ name, email, password }) {
    const user = await User.create({
      name,
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
    // He is not returning this response
    // return response.status(204).json({
    //   type: 'success-register',
    //   msg: Antl.formatMessage('response.success-register', { name: user.name }),
    // });
  }

  async destroy({ id }) {
    const user = await User.findBy({
      id,
    });

    await user.delete();

    user.deleted = true;
    user.status = false;

    await user.save();

    return user;
  }

  async restore({ id }) {
    await Database.table('users')
      .where('id', id)
      .update({ deleted_at: null, deleted: false, status: true });

    const user = await Database.table('users').where('id', id);

    return user;
  }
}

module.exports = UserService;
