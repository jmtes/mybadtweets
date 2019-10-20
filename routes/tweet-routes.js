const router = require('express').Router();
const Twit = require('twit');
const keys = require('../config/keys');
const math = require('mathjs');

let client = undefined;

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
    console.log(req.user.username)
    next();
  }
}

router.get('/', authCheck, (req, res) => {
  let tweetArray = [];
  let i = 15;

  const params = {
    screen_name: req.user.username,
    count: 2,
    trim_user: true,
    exclude_replies: true,
    include_rts: false,
    tweet_mode: 'extended'
  }

  function calcLikeThreshold() {
    let tweetLikes = [];

    tweetArray.forEach(function (tweet) {
      tweetLikes.push(tweet.favorite_count);
    })

    const avg = parseInt(math.mean(tweetLikes));
    const stdDev = parseInt(math.std(tweetLikes));
    return (avg - stdDev);
  }

  function getTweets() {
    client.get('statuses/user_timeline', params, function makeTweetList(err, data, response) {
      tweetArray = tweetArray.concat(data);
      params.max_id = tweetArray[tweetArray.length - 1].id;
      i--;
      if (i) {
        client.get('statuses/user_timeline', params, makeTweetList);
      } else {
        const likeThreshold = calcLikeThreshold();
        console.log(likeThreshold);
        const badTweets = tweetArray.filter(tweet => tweet.favorite_count > likeThreshold);
        console.log(badTweets);

        res.render('tweets', {
          user: req.user,
          tweets: badTweets
        });
      }
    });
  }

  console.log(params.screen_name);
  getTweets();
});

module.exports = router;
