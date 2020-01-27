const axios = require('axios');
const User = require('../models/User');

module.exports = {
    async index(request, response) {
        const users = await User.find();
        return response.json(users);
    },

    async store(request, response) {
        const { name, email, password, avatar_url } = request.body;

        const user = await User.create({
          name,
          email,
          password,
          avatar_url,  
        })

        return response.json(user);
    },

    async update(request, response) {
        const { id, name, email, password, avatar_url } = request.body;
        
            var query = { _id: id };
            user = await User.update(query, {
                name,
                email,
                password,
                avatar_url,
            })
        
        return response.json(user);
    },

    async destroy(request, response) {
        const { id } = request.params.id;
        
        user = await User.findOneAndRemove({ id });
    
        return response.json(user);
    }
};