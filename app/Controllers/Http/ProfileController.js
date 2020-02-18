const Helpers = use('Helpers');

const Antl = use('Antl');
class ProfileController {
  async update({ request, response, auth }) {
    const data = request.only(['name']);
    const user = await auth.getUser();
    const avatar = request.file('avatar');

    if (avatar) {
      await avatar.move(Helpers.tmpPath('uploads'), {
        name: `${new Date().getTime()}.${avatar.subtype}`,
      });

      if (!avatar.moved()) {
        return avatar.error();
      }

      user.avatar = avatar.fileName;
    }

    user.merge(data);

    const password = request.input('password');
    if (password) {
      user.password = password;
    }

    await user.save();
    return response.status(200).json({
      type: 'success-profile-update',
      msg: Antl.formatMessage('response.success-profile-update'),
      user,
    });
  }
}

module.exports = ProfileController;
