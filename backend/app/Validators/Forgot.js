class Forgot {
  get rules () {
    return {
      email: 'email|required',
    };
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.'
    }
  }

  async fails (messages) {
    return this.ctx.response.send(messages);
  }
}

module.exports = Forgot
