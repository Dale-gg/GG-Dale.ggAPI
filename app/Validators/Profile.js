const Antl = use('Antl');

class Profile {
  get validateAll() {
    return true;
  }

  get rules () {
    return {
      name: 'required',
      password: 'confirmed',
      avatar: 'file|file_ext:png,jpg,jpeg|file_size:2mb|file_types:image',
    };
  }

  get messages() {
    return Antl.list('validation');
  }

  async fails (messages) {
    return this.ctx.response.send(messages);
  }
}

module.exports = Profile;
