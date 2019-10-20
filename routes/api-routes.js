const router = require('express').Router();
const Twit = require('twit');
const keys = require('../config/keys');
const bodyParser = require('body-parser').json();

let client = undefined;

const authCheck = (req, res, next) => {
  if (!req.user) {
    // If user is not logged in
    res.redirect('/auth/login');
  } else {
    // If user is logged in
    client = new Twit({
      consumer_key: keys.twitter.consumerKey,
      consumer_secret: keys.twitter.consumerSecret,
      access_token: req.user.accessToken,
      access_token_secret: req.user.accessTokenSecret
    });
    next();
  }
}

router.post('/delete', authCheck, bodyParser, (req, res) => {
  console.log('inside route');
  console.log(req);
  res.send({
    tweetid: req.params.tweetid,
    username: req.user.username,
    access: req.user.accessToken,
    secret: req.user.accessTokenSecret
  });
});

module.exports = router;
