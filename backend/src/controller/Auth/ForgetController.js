const User = require('../../models/User');
const sendToken = require('../../utils/sendToken');
const crypto = require('crypto');
require('dotenv').config({path: ".env"});

module.exports = {
    async recover(request, response) {
        var entry = 'forget';
        User.findOne({ email: request.body.email }, function (err, user) {
            if (!user) return response.status(400).json({ type: 'email-not-found', msg: 'Não encontramos nenhum usuário com este email.' });

            // Criar uma verificação de token, salvar, e enviar o email
            const token = user.passwordResetToken = crypto.randomBytes(16).toString('hex');
            user.passwordResetExpires = Date.now() + 3600000; // Expires in an hour

            // Salva o token
            user.save(function (err) {
                if (err) {
                    return response.status(500).json({ type: 'server-error', msg: err.message });
                }

                // Envia o email
                if (!sendToken(user.email, entry, user.passwordResetToken, request.headers.host)) {
                    response.status(200).json({ type: 'done', msg: 'Um email de recuperação foi enviado para: ' + user.email, user});
                } else {
                    response.status(500).json({ type: 'error', msg: 'Ocorreu um erro durante o envio do seu email, tente novamente mais tarde'});
                }
            });
        });
    },

    async confirmToken(request, response) {
        // Buscando o token na base de dados
        User.findOne({ email: request.params.email, passwordResetToken: request.params.token }, function (err, user) {
            if (!user) return response.status(404).json({ type: 'not-verified', msg: 'Não encontramos nenhum usuário com esse token. Seu token pode ter expirado, tente a opção de reenvio.'});     
            
            response.status(200).json({ type: 'done', msg: 'Usuário encontrado, redirecionando para o formulário' });
        });
    },
}