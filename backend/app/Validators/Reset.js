class Reset {
  get rules () {
    return {
     token: 'required',
     password: 'required|confirmed'
    };
  }

  get messages () {
    return {
      'token.required': 'You must provide a token address.',
      'password.required': 'You must provide a password',
      'password.confirmed': 'You must provide the password_confirmation'
    }
  }

  async fails (messages) {
    return this.ctx.response.send(messages);
  }
}

module.exports = Reset
