const User = require('../../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: ".env"});

module.exports = {
    async login(request, response) {
        const { email, password } = request.body;

        let user = await User.findOne({ email, password });

        if (!user) {
            return response.status(404).json({ type: 'Usuário não encontrado', msg: 'Usuário e senha não encontrados' });

        } else if (!user.status) {
            return response.status(401).json({ type: 'Usuário desativado ou não verificado', msg: 'Sua conta esta desativada ou ainda não foi verificada, cheque sua caixa de email!' });
        
        } else {
            let id = user._id;
            var token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 300
            });
            return response.status(200).send({ auth: true, token: token });
        }
    }
}