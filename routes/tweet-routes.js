const router = require('express').Router();
const Twit = require('twit');
const keys = require('../config/keys');
const math = require('mathjs');

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
  let likeThreshold = undefined;
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

  function calcLikeThreshold() {
    console.log('enter calcLikeThreshold');
    let tweetLikes = [];
    tweetArray.forEach(function (tweet) {
      console.log(tweet);
    })
  }

  function getTweets() {
    client.get('statuses/user_timeline', params, function makeTweetList(err, data, response) {
      tweetArray = tweetArray.concat(data);
      params.max_id = tweetArray[tweetArray.length - 1].id;
      i--;
      if (i) {
        client.get('statuses/user_timeline', params, makeTweetList);
      } else {
        calcLikeThreshold();
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
