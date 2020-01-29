const User = require('../../models/User');
const Token = require('../../models/Token');
require('dotenv').config({path: ".env"});

module.exports = {
    async confirmation(request, response) {
        const { email, token } = request.params;

        var tokenFind = Token.findOne({ token });

        if (!tokenFind) {
            return response.status(400).json({ type: 'Não verificado', msg: 'Não conseguimos encontrar nenhum token valido. Seu token pode ter expirado.' });
        }

        var userFind  = User.findOne({ _id: tokenFind._userId, email });

        if (!userFind) {
            return response.status(400).json({ type: 'Não encontrado', msg: 'Não conseguimos encontrar um usuário com este token.'});
        }

    

        function (err, token) {
            if (!token) return response.status(400).json({ type: 'Não verificado', msg: 'Não conseguimos encontrar nenhum token valido. Seu token pode ter expirado.'});

            User.findOne({ 
                _id: token._userId,
                email: request.body.email 
            },
            function (err, user) {
                if (!user) return response.status(400).json({type: 'Não encontrado', msg: 'Não conseguimos encontrar um usuário com este token.' });
                if (user.status) return response.status(400).json({ type: 'Já verificado', msg: 'Este usuário já foi verificado' });

                user.status = true;
                user.save(function (err) {
                    if (err) { return response.status(500).json({ type: 'Server Error', msg: err.message }); }
                    response.status(200).json({ type: 'Conta Verificada', msg: 'A conta foi verificada. Por favor faça o login' });
                });
            });
        });

        
        
    }
}