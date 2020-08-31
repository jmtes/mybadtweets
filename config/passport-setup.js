// This module sets up PassportJS.

const passport = require('passport');
const Strategy = require('passport-twitter');

const keys = require('./keys');
const User = require('../models/user-model');

// Set up Twitter authentication strategy.
passport.use(
  new Strategy(
    {
      consumerKey: keys.twitter.consumerKey,
      consumerSecret: keys.twitter.consumerSecret,
      callbackURL: keys.twitter.callbackURL
    },
    (token, tokenSecret, profile, done) => {
      const getUser = async () => {
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
      };

      getUser().then((user) => {
        done(null, user);
      });
    }
  )
);

// Encodes and writes user info to browser cookie
passport.serializeUser((user, done) => {
  done(null, user.username);
});

// Decodes user info from browser cookie to use in backend
passport.deserializeUser((username, done) => {
  User.findOne({ username }).then((user) => {
    done(null, user);
  });
});
