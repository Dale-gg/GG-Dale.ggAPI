const User = require('../models/User');

module.exports = {
    async index(request, response) {
        const { _id: id } = request.query;

        const users = await User.find({
            id,
        });

        return response.json({ users });
    }
}