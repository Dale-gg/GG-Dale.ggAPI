const Antl = use('Antl');

class Session {
  get validateAll(){
    return true;
  }

  get rules () {
    return {
      email: 'email|required',
      password: 'required',
    };
  }

  get messages () {
    return Antl.list('validation');
  }

  async fails (messages) {
    return this.ctx.response.send(messages);
  }
}

module.exports = Session
