class User {
  get rules () {
    return {
     email: 'email|required|unique:users',
     password: 'required|confirmed'
    };
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password',
      'password.confirmed': 'You must provide the password_confirmation'
    }
  }

  async fails (messages) {
    return this.ctx.response.send(messages);
  }
}

module.exports = User
