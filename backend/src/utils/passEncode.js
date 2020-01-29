const bcrypt = require('bcrypt');

module.exports = function passEncode(password) {  
    var hash = bcrypt.hashSync(password, saltRounds = 10);

    return hash; 
};