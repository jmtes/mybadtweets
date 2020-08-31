// This module sets up the MongoDB schema for user records.

const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  twitterID: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  accessTokenSecret: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date(),
    expires: 86400
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
