const UserRepository = use('App/Repositories/UserRepository');

const Mail = use('Mail');
const Env = use('Env');
const Antl = use('Antl');

const { randomBytes } = require('crypto');
const { promisify } = require('util');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async index() {
    const users = await this.userRepository.index();

    return users;
  }

  async store({ name, email, password }) {
    const user = await this.userRepository.store(name, email, password);

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
  }

  async destroy({ id }) {
    const user = await this.userRepository.destroy(id);

    return user;
  }

  async restore({ id }) {
    const user = await this.userRepository.restore(id);

    return user;
  }
}

module.exports = UserService;
