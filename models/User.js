const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number
});

module.exports = mongoose.model('users', userSchema);
