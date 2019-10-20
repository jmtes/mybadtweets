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
  console.log('tweet id is ' + req.body.tweetid);
  const data = {
    status: undefined
  }

  const endpoint = 'statuses/destroy/' + req.body.tweetid;
  console.log(endpoint);

  client.post(endpoint, (err, data, response) => {
    if (!err) {
      data.status = 'OK';
    } else {
      data.status = 'FAIL';
    }
  })

  console.log(data);
  res.set('Content-Type', 'application/json');
  res.send(data);
});

module.exports = router;
