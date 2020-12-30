// Typescript Intellisense
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const Database = use('Database');

class UserRepository {
  async index() {
    const users = await User.all();

    return users;
  }

  async store(name, email, password) {
    const user = await User.create({
      name,
      email,
      password,
    });

    return user;
  }

  async destroy(id) {
    const user = await User.findBy({
      id,
    });

    await user.delete();

    user.deleted = true;
    user.status = false;

    await user.save();

    return user;
  }

  async restore(id) {
    await Database.table('users')
      .where('id', id)
      .update({ deleted_at: null, deleted: false, status: true });

    const user = await Database.table('users').where('id', id);

    return user;
  }
}

module.exports = UserRepository;
