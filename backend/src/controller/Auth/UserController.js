//const axios = require('axios');
const User = require('../../models/User');
const passEncode = require('../../utils/passEncode');

module.exports = {
    async index(request, response) {
        const users = await User.find();
        return response.status(200).json({ type: 'lista-usuarios', msg: 'Listando usuários', users});
    },

    async update(request, response) {
        const { id } = request.params;
        const { name, avatar_url } = request.body;
        
            var query = { _id: id };
            user = await User.update(query, {
                name,
                avatar_url,
            });

        return response.status(200).json({ type: 'usuario-atualizado', msg: 'Usuário atualizado com sucesso.'});
    },

    async destroy(request, response) {
        const { id } = request.params;
        
        user = await User.findOneAndRemove({ _id: id });
    
        return response.status(200).json({ type: 'usuario-deletado', msg: 'Usuário deletado com sucesso.' });
    },

    async detail(request, response) {
        const { _id: id } = request.query;

        const users = await User.find({
            id,
        });

        return response.status(200).json({ type: 'detalhando-usuario', msg: 'Detalhando usuário', users });
    },

    async disable(request, response) {
        const { _id: id } = request.params;

        user = await User.findOne({
           id    
        }); 
        
        user.status = false;
        user.deleted = true;
        user.deletedAt = Date.now();
        
        user.save();
        
        return response.status(200).json({ type: 'usuario-desativado', msg: 'Usuário desativado com sucesso.' });
    },

    async restore(request, response) {
        const { _id: id } = request.params;

        user = await User.findOne({
           id    
        }); 
        
        user.status = true;
        user.deleted = false;
        user.deletedAt = null;
        
        user.save();
        
        return response.status(200).json({ type: 'usuario-restaurado', msg: 'Usuário restaurado com sucesso.' });
    },
    
    async resetPass(request, response) {
        const { email } = request.params;
        const { password, password_confirm } = request.body;
        
        if (password == password_confirm) {
            const passEncoded = passEncode(password);
            var query = { email: email }
            user = await User.update(query, {
                password: passEncoded
            });

            if (user) {
                return response.status(200).json({ type: 'feito', msg: 'Senha resetada com sucesso.'});
            } else {
                return response.status(500).json({ type: 'error', msg: 'Ocorreu algum erro no servidor, tente novamente mais tarde.'});
            }
        } else {
            return response.status(400).json({ type: 'erro-validacao', msg: 'As senhas digitadas não coincidem.'});
        }
    }
};