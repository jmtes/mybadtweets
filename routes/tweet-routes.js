const router = require('express').Router();
const Twit = require('twit');
const keys = require('../config/keys');
const math = require('mathjs');
const messages = require('../config/messages');

let client;

const authCheck = (req, res, next) => {
  if (!req.user) {
    // If user is not logged in
    res.redirect('/auth');
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
};

router.get('/', authCheck, (req, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  // console.log(req.user);
  // console.log(req.session);
  // console.log(req.sessionID);
  let tweetArray = [];
  let i = 16;

  const params = {
    screen_name: req.user.username,
    count: 200,
    trim_user: true,
    exclude_replies: true,
    include_rts: false,
    tweet_mode: 'extended'
  };

  function calcLikeThreshold () {
    const tweetLikes = [];

    tweetArray.forEach(function (tweet) {
      tweetLikes.push(tweet.favorite_count);
    });

    const avg = parseInt(math.mean(tweetLikes));
    let stdDev = parseInt(math.std(tweetLikes));
    while (stdDev > avg) {
      stdDev = parseInt(stdDev * 0.8);
    }

    return (avg - stdDev);
  }

  client.get('statuses/user_timeline', params, function makeTweetList (_err, data, response) {
    tweetArray = tweetArray.concat(data);
    params.max_id = tweetArray[tweetArray.length - 1].id;
    i--;
    if (i) {
      client.get('statuses/user_timeline', params, makeTweetList);
    } else {
      const likeThreshold = calcLikeThreshold();
      let badTweets;
      if (likeThreshold) {
        badTweets = tweetArray.filter(tweet => tweet.favorite_count < likeThreshold);
      } else {
        badTweets = tweetArray.filter(tweet => tweet.favorite_count === likeThreshold);
      }
      res.render('newtweets', {
        user: req.user,
        tweets: badTweets,
        msgs: messages
      });
    }
  });
});

module.exports = router;
