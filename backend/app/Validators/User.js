const Antl = use('Antl');

class User {
  get validateAll(){
    return true;
  }

  get rules () {
    return {
     email: 'email|required|unique:users',
     password: 'required|confirmed'
    };
  }

  get messages () {
    return Antl.list('validation');
  }
}

module.exports = User
