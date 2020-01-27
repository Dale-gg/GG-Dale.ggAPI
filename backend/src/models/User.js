const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    avatar_url: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);