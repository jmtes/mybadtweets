const passport = require('passport');
const Strategy = require('passport-twitter');
const keys = require('./keys');
const User = require('../models/user-model');

passport.use(
  new Strategy({
  // Options for the strategy
    consumerKey: keys.twitter.consumerKey,
    consumerSecret: keys.twitter.consumerSecret,
    callbackURL: '/auth/twitter/redirect'
  }, (token, tokenSecret, profile, done) => {
    // Passport callback function
    console.log('passport callback function fired');
    console.log(profile.id);
    console.log(profile.username);
    // You're gonna want profile.id and profile.username !
    new User({
      username: profile.username,
      twitterID: profile.id,
      accessToken: token,
      accessTokenSecret: tokenSecret
    }).save().then((newUser) => {
      console.log('new user created' + newUser);
    });
  })
);
