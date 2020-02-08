const mongoose = require('mongoose'),
      soft_delete = require('mongoose-softdelete');

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    avatar_url: { type: String, required: true },
    status: { type: Boolean, default: false },
    passwordResetToken: String,
    passwordResetExpires: Date,
    email_verified_at: Date,
},  {timestamps: true});

UserSchema.plugin(soft_delete);

module.exports = mongoose.model('User', UserSchema);