const passport = require('passport');
const Strategy = require('passport-twitter');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new Strategy({
  // Options for the strategy
    consumerKey: keys.twitter.consumerKey,
    consumerSecret: keys.twitter.consumerSecret,
    callbackURL: '/auth/twitter/redirect'
  }, (token, tokenSecret, profile, done) => {
    Check if user already exists in db
    User.findOne({twitterID: profile.id}).then((currentUser) => {
      if(currentUser){
        // User exists
        console.log('User is: ', currentuser);
        done(null, currentUser);
      } else {
        new User({
          username: profile.username,
          twitterID: profile.id,
          accessToken: token,
          accessTokenSecret: tokenSecret
          }).save().then((newUser) => {
            console.log('new user created' + newUser);
            done(null, newUser);
        });
       }
    })
  })
);
