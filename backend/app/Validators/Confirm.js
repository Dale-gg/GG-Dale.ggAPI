class Confirm {
  get rules () {
    return {
      token: 'required',
    };
  }

  get messages () {
    return {
      'token.required': 'You must provide a token address.'
    }
  }

  async fails (messages) {
    return this.ctx.response.send(messages);
  }
}

module.exports = Confirm
