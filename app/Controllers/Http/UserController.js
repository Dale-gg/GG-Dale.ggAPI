const UserService = use('App/Services/UserService');
const Antl = use('Antl');
class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async index({ response }) {
    const users = await this.userService.index();

    return response.status(200).json({
      type: 'success-all-users',
      msg: Antl.formatMessage('response.success-all-users'),
      users,
    });
  }

  async store({ request, response }) {
    const user = await this.userService.store(request.all());

    return response.json({
      type: 'success-register',
      msg: '',
      user: Antl.formatMessage('response.success-register', {
        name: user.name,
      }),
    });
  }

  async destroy({ response, params }) {
    const { id } = await this.userService.destroy(params);

    return response.status(204).json({
      type: 'user-soft-deleted',
      msg: Antl.formatMessage('response.user-soft-deleted', { id }),
    });
  }

  async restore({ response, params }) {
    const { id } = await this.userService.restore(params);

    return response.status(200).json({
      type: 'user-soft-restored',
      msg: Antl.formatMessage('response.user-soft-restored', { id }),
    });
  }
}

module.exports = UserController;
