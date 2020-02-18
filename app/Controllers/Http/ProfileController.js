const Helpers = use('Helpers');

class ProfileController {
    async update ({ request, auth }) {
        const data = request.only([
          'name'
        ]);

        const user = await auth.getUser();

        const avatar = request.file('avatar');

        if(avatar) {
          await avatar.move(Helpers.tmpPath('uploads'), {
            name: `${new Date().getTime()}.${avatar.subtype}`,
          });

          if (!avatar.moved()){
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

        return user;
    }
}

module.exports = ProfileController
