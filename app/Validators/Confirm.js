const Antl = use('Antl');

class Confirm {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      token: 'required',
    };
  }

  get messages() {
    return Antl.list('validation');
  }

  async fails(messages) {
    return this.ctx.response.send(messages);
  }
}

module.exports = Confirm;
