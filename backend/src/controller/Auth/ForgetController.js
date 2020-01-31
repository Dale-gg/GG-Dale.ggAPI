const User = require('../../models/User');
const Token = require('../../models/Token');
const sendEmail = require('../../utils/sendEmail');
const crypto = require('crypto');
require('dotenv').config({path: ".env"});

module.exports = {
    async recover(request, response) {
        User.findOne({ email: request.body.email }, function (err, user) {
            if (!user)
                return response.status(400).json({ type: 'email-not-found', msg: 'Não encontramos nenhum usuário com este email.' });

            // Criar uma verificação de token, salvar, e enviar o email
        
            const token = user.passwordResetToken = crypto.randomBytes(16).toString('hex');
            user.passwordResetExpires = Date.now() + 3600000; // Expires in an hour

            // Salva o token
            user.save(function (err) {
                if (err) {
                    return response.status(500).json({ type: 'server-error', msg: err.message });
                }

                // Envia o email
                if (!sendEmail(user.email, token, request.headers.host)){
                    response.status(200).json({ type: 'done', msg: 'Um email de verificação foi enviado para: ' + user.email, user});
                } else {
                    response.status(500).json({ type: 'error', msg: 'Ocorreu um erro durante o envio do seu email, tente novamente mais tarde'});
                }
            });
        });
    },

    async resetPass(request, response) {

    }
}