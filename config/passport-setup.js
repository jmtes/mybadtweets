const passport = require('passport');
const Strategy = require('passport-twitter');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.twitterID);
});

passport.deserializeUser((id, done) => {
  User.findOne({ twitterID: id }).then((user) => {
    done(null, user);
  });
});

passport.use(new Strategy({
  consumerKey: keys.twitter.consumerKey,
  consumerSecret: keys.twitter.consumerSecret,
  callbackURL: '/auth/redirect'
}, (token, tokenSecret, profile, done) => {
  async function getUser () {
    // Check if user already exists in db
    let user = await User.findOne({ twitterID: profile.id });

    if (user) {
      user.accessToken = token;
      user.accessTokenSecret = tokenSecret;
    } else {
      user = new User({
        username: profile.username,
        twitterID: profile.id,
        accessToken: token,
        accessTokenSecret: tokenSecret
      });
    }

    user = await user.save();
    return user;
  }

  getUser()
    .then(user => {
      console.log(user);
      done(null, user);
    });
}));
