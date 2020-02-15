class Session {
  get rules () {
    return {
      email: 'email|required',
      password: 'required',
    };
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'password.required': 'You must provide a password'
    }
  }

  async fails (messages) {
    return this.ctx.response.send(messages);
  }
}

module.exports = Session
