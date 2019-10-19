const router = require('express').Router();
const Twit = require('twit');
const keys = require('../config/keys');

const authCheck = (req, res, next) => {
  if (!req.user) {
    // If user is not logged in
    res.redirect('/auth/login');
  } else {
    // If user is logged in
    next();
  }
}

router.get('/', authCheck, (req, res) => {
  let tweetArray = undefined;

  const params = {
    screen_name: req.user.username,
    count: 2,
    trim_user: true,
    exclude_replies: true,
    include_rts: false
  }

  const client = new Twit({
    consumer_key: keys.twitter.consumerKey,
    consumer_secret: keys.twitter.consumerSecret,
    access_token: req.user.accessToken,
    access_token_secret: req.user.accessTokenSecret
  });

  function getTweets() {
    client.get('statuses/user_timeline', params, (err, data, response) => {
      // console.log(data);
      console.log('inside callback');
      tweetArray = data;
      console.log('tweetArray is: ', tweetArray);
      res.render('tweets', {
        user: req.user,
        tweets: tweetArray
      });
    });
  }

  getTweets();
  // console.log('right before render. tweetArray is: ' + tweetArray);
});

module.exports = router;
