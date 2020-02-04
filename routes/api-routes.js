const router = require('express').Router();
const Twit = require('twit');
const keys = require('../config/keys');
const bodyParser = require('body-parser').json();
const math = require('mathjs');

const authCheck = (req, res, next) => {
  if (!req.user) {
    // If user is not logged in
    res.redirect('/auth');
  } else {
    // If user is logged in
    next();
  }
};

router.get('/fetch', authCheck, (req, res) => {
  console.log('inside fetch route');
  console.log(`fetching ${req.user.username}'s tweets`);
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

  const client = new Twit({
    consumer_key: keys.twitter.consumerKey,
    consumer_secret: keys.twitter.consumerSecret,
    access_token: req.user.accessToken,
    access_token_secret: req.user.accessTokenSecret
  });

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
      res.send(JSON.stringify({
        user: req.user.username,
        tweets: badTweets
      }));
    }
  });
});

router.post('/delete', authCheck, bodyParser, (req, res) => {
  console.log('inside route');
  console.log('tweet id is ' + req.body.tweetid);
  const bod = {
    status: undefined,
    errorCode: undefined
  };

  const endpoint = 'statuses/destroy/' + req.body.tweetid;
  console.log(endpoint);

  const client = new Twit({
    consumer_key: keys.twitter.consumerKey,
    consumer_secret: keys.twitter.consumerSecret,
    access_token: req.user.accessToken,
    access_token_secret: req.user.accessTokenSecret
  });

  client.post(endpoint, (err, data, response) => {
    console.log('inside delete callback');
    console.log('err is: ', err);
    console.log('data is: ', data.text);
    if (!err) {
      bod.status = 'OK';
      console.log(bod);
      res.set('Content-Type', 'application/json');
      res.send(bod);
    } else {
      console.log('err is: ', err.code, err.message);
      bod.status = 'FAIL';
      bod.errorCode = err.code;
      console.log(bod);
      res.set('Content-Type', 'application/json');
      res.send(bod);
    }
  });
});

router.post('/retweet', authCheck, bodyParser, (req, res) => {
  console.log('inside route');
  console.log('tweet id is ' + req.body.tweetid);
  const bod = {
    status: undefined,
    errorCode: undefined
  };

  const endpoint = 'statuses/retweet/' + req.body.tweetid;
  console.log('endpoint is ' + endpoint);

  const client = new Twit({
    consumer_key: keys.twitter.consumerKey,
    consumer_secret: keys.twitter.consumerSecret,
    access_token: req.user.accessToken,
    access_token_secret: req.user.accessTokenSecret
  });

  client.post(endpoint, (err, data, response) => {
    console.log('inside delete callback');
    // console.log('data is: ', data.text);
    if (!err) {
      bod.status = 'OK';
      console.log(bod);
      res.set('Content-Type', 'application/json');
      res.send(bod);
    } else {
      console.log('err is: ', err.code, err.message);
      bod.status = 'FAIL';
      bod.errorCode = err.code;
      console.log(bod);
      res.set('Content-Type', 'application/json');
      res.send(bod);
    }
  });
});

module.exports = router;
