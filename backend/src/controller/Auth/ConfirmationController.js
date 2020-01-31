const User = require('../../models/User');
const Token = require('../../models/Token');
const sendEmail = require('../../utils/sendEmail');
const crypto = require('crypto');
require('dotenv').config({path: ".env"});

module.exports = {
    async confirmation(request, response) {

        // Buscando o token na base de dados
        Token.findOne({ token: request.params.token }, function (err, token) {
            if (!token)
                return response.status(400).json({ type: 'not-verified', msg: 'Não encontramos nenhum token. Seu token pode ter expirado.'});
        
            // Se encontrarmos um token, buscamos pelo seu respectivo usuário
            User.findOne({ _id: token._userId, email:  request.params.email }, function (err, user) {
                if (!user) 
                    return response.status(400).json({ type: 'not-found', msg: 'Não encontramos nenhum usuário com este token.' });
                if (user.status)
                    return response.status(400).json({ type: 'already-verified', msg: 'Este usuário já foi verificado.' });

                // Verifica e salva o usuário
                user.status = true;
                user.save(function (err) {
                    if (err) {
                        return response.status(500).json({ type: 'server-error', msg: err.message }); 
                    }
                    response.status(200).json({ type: 'acc-verified', msg: 'Conta verificada, por favor faça o login.'});
                });
            });
        });
    },

    async resend(request, response) {
        User.findOne({ email: request.body.email }, function (err, user) {
            if (!user)
                return response.status(400).json({ type: 'email-not-found', msg: 'Não encontramos nenhum usuário com este email.' });
            if (user.status)
                return response.status(400).json({ type: 'already-verified', msg: 'Este usuário já foi verificado.' });

            // Criar uma verificação de token, salvar, e enviar o email
            var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

            // Salva o token
            token.save(function (err) {
                if (err) {
                    return response.status(500).json({ type: 'server-error', msg: err.message });
                }

                // Envia o email
                if (!sendEmail(user.email, token.token, request.headers.host)){
                    response.status(200).json({ type: 'done', msg: 'Um email de verificação foi enviado para: ' + user.email});
                } else {
                    response.status(500).json({ type: 'error', msg: 'Ocorreu um erro durante o envio do seu email, tente novamente mais tarde'});
                }
            });
        });
    },
}