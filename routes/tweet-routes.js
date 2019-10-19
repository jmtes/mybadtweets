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
  let tweetArray = [];
  let i = 15;

  const params = {
    screen_name: req.user.username,
    count: 200,
    trim_user: true,
    exclude_replies: true,
    include_rts: false,
    tweet_mode: 'extended'
  }

  const client = new Twit({
    consumer_key: keys.twitter.consumerKey,
    consumer_secret: keys.twitter.consumerSecret,
    access_token: req.user.accessToken,
    access_token_secret: req.user.accessTokenSecret
  });

  function getTweets() {
    client.get('statuses/user_timeline', params, function makeTweetList(err, data, response) {
      tweetArray.concat(data);
      params.max_id = tweetArray[tweetArray.length - 1].id;
      iterations--;
      if (iterations) {
        client.get('statuses/user_timeline', params, makeTweetList);
      } else {
        res.render('tweets', {
          user: req.user,
          tweets: tweetArray
        });
      }
    });
  }

  getTweets();
});

module.exports = router;
