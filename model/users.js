const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: Number,
  password: String
}, {
  timestamps: true
});

let users = mongoose.model('users', userSchema)
module.exports = users;

