//const axios = require('axios');
const User = require('../../models/User');
const Token = require('../../models/Token');
const crypto = require('crypto');
const passEncode = require('../../utils/passEncode');
const sendToken = require('../../utils/sendToken');
require('dotenv').config({path: ".env"});

module.exports = { 
    async register(request, response) {
        var entry = 'register';
        const { name, email, password, password_confirm, avatar_url } = request.body;

        findUser = await User.findOne({email});

        if (findUser) {
            return response.status(400).send({ msg: 'O email que você tentou cadastrar já existe!' });
        } else {
            if (password == password_confirm) {           
                const passEncoded = passEncode(password);
        
                user = await User.create({
                    name,
                    email,
                    password: passEncoded,
                    avatar_url
                });

                var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

                token.save(function (err) {
                    if (err) { return response.status(500).json({ msg: err.message }); }
                });

                if (!sendToken(user.email, entry, token.token, request.headers.host)){
                    response.status(200).json({ type: 'done', msg: 'Um email de verificação foi enviado para: ' + user.email});
                } else {
                    response.status(500).json({ type: 'error', msg: 'Ocorreu um erro durante o envio do seu email, tente novamente mais tarde'});
                }
            } else {
                response.status(400).json({ type: 'validation-error', msg: 'As senhas digitadas não coincidem.'});
            }
        }
    }
}