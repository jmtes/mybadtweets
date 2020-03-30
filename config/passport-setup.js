// This module sets up PassportJS.

const passport = require('passport');
const Strategy = require('passport-twitter');
const keys = require('./keys');
const User = require('../models/user-model');

// Encodes and writes user info to browser cookie
passport.serializeUser((user, done) => {
  done(null, user.twitterID);
});

// Decodes user info from browser cookie
passport.deserializeUser((id, done) => {
  User.findOne({ twitterID: id }).then((user) => {
    done(null, user);
  });
});

console.log('MBT_CALLBACKURL ENV VAR: ' + process.env.MBT_CALLBACKURL);
console.log('TWITTER CALLBACK URL' + keys.twitter.callbackURL);

// Set up Twitter authentication strategy.
passport.use(new Strategy({
  consumerKey: keys.twitter.consumerKey,
  consumerSecret: keys.twitter.consumerSecret,
  callbackURL: keys.twitter.callbackURL
}, (token, tokenSecret, profile, done) => {
  async function getUser () {
    // Check if user already exists in db
    let user = await User.findOne({ twitterID: profile.id });

    if (user) {
      // User exists, refresh access tokens
      user.accessToken = token;
      user.accessTokenSecret = tokenSecret;
    } else {
      // User does not exist, create new user
      user = new User({
        username: profile.username,
        twitterID: profile.id,
        accessToken: token,
        accessTokenSecret: tokenSecret
      });
    }

    // Save user to database and return their info
    user = await user.save();
    return user;
  }

  getUser()
    .then(user => {
      console.log(user);
      done(null, user);
    });
}));
