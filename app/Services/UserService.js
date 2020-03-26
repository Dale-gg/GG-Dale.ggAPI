const UserRepository = use('App/Repositories/UserRepository');

const Mail = use('Mail');
const Env = use('Env');
const Antl = use('Antl');
const Event = use('Event');

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

    Event.fire('new::user', user, token);
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
