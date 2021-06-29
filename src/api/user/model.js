const mongoose = require('../../app/database');
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
  username: {
    type: String,
    required: true,
    trim: true
  },
  score: {
    type: [{
      timestamp: { type: Date, default: Date.now },
      score: Number
    }],
    trim: true
  },
  username: {
    type: String,
    trim: true
  },

});

const User = mongoose.model('User', userSchema);

module.exports = User;
