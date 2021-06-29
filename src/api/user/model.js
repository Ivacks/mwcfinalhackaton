const mongoose = require('../../app/database');
const SHA256 = require('crypto-js/sha256');
const { nanoid } = require('nanoid');
const validateEmail = require('../../utils/validateEmail');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: nanoid,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: [validateEmail, 'email no válido.'],
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
});

userSchema.pre('save', function (next) {
  const user = this;

  user.password = SHA256(user.password);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
