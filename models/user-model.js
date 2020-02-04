// This module sets up the MongoDB schema for user records.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  twitterID: String,
  accessToken: String,
  accessTokenSecret: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;
