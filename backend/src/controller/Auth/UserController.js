//const axios = require('axios');
const User = require('../../models/User');
const Token = require('../../models/Token');
const passEncode = require('../../utils/passEncode');
const nodemailer = require("nodemailer");
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const users = await User.find();
        return response.json(users);
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