const router = require('express').Router();
const Twit = require('twit');
const bodyParser = require('body-parser').json();
const math = require('mathjs');

const keys = require('../config/keys');

// Check if user is logged in
const authCheck = (req, res, next) => {
  if (!req.user) {
    // User is not logged in, redirect to auth page
    res.redirect('/auth');
  } else {
    // User is logged in, proceed
    next();
  }
};

// Create new Twit instance from user info
const newTwit = (req) => {
  return new Twit({
    consumer_key: keys.twitter.consumerKey,
    consumer_secret: keys.twitter.consumerSecret,
    access_token: req.user.accessToken,
    access_token_secret: req.user.accessTokenSecret
  });
};

// Determine how few likes a tweet must have to be considered "bad"
// @param tweets - array of tweet objects
const calcLikeThreshold = (tweets) => {
  const tweetLikes = [];

  tweets.forEach(function (tweet) {
    tweetLikes.push(tweet.favorite_count);
  });

  const avg = parseInt(math.mean(tweetLikes), 10);
  let stdDev = parseInt(math.std(tweetLikes), 10);

  while (stdDev > avg) {
    stdDev = parseInt(stdDev * 0.8, 10);
  }

  // Return difference between average and standard deviation
  return avg - stdDev;
};

// Filter the bad tweets
// @param tweets - array of tweet objects
const getBadTweets = (tweets) => {
  const likeThreshold = calcLikeThreshold(tweets);

  if (likeThreshold) {
    tweets = tweets.filter((tweet) => tweet.favorite_count < likeThreshold);
  } else {
    tweets = tweets.filter((tweet) => tweet.favorite_count === likeThreshold);
  }

  // Return filtered array
  return tweets;
};

router.get('/fetch', authCheck, (req, res) => {
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

  const client = newTwit(req);

  client.get('statuses/user_timeline', params, function makeTweetList(
    _err,
    data
  ) {
    tweetArray = tweetArray.concat(data);
    params.max_id = tweetArray[tweetArray.length - 1].id;
    i -= 1;
    if (i) {
      client.get('statuses/user_timeline', params, makeTweetList);
    } else {
      res.send(
        JSON.stringify({
          user: req.user.username,
          tweets: getBadTweets(tweetArray)
        })
      );
    }
  });
});

router.post('/delete', authCheck, bodyParser, (req, res) => {
  const bod = {
    status: undefined,
    errorCode: undefined
  };

  const endpoint = `statuses/destroy/${req.body.tweetid}`;

  const client = newTwit(req);

  client.post(endpoint, (err) => {
    if (!err) {
      bod.status = 'OK';
      res.set('Content-Type', 'application/json');
      res.send(bod);
    } else {
      bod.status = 'FAIL';
      bod.errorCode = err.code;
      res.set('Content-Type', 'application/json');
      res.send(bod);
    }
  });
});

router.post('/retweet', authCheck, bodyParser, (req, res) => {
  const bod = {
    status: undefined,
    errorCode: undefined
  };

  const endpoint = `statuses/retweet/${req.body.tweetid}`;

  const client = newTwit(req);

  client.post(endpoint, (err) => {
    if (!err) {
      bod.status = 'OK';
      res.set('Content-Type', 'application/json');
      res.send(bod);
    } else {
      bod.status = 'FAIL';
      bod.errorCode = err.code;
      res.set('Content-Type', 'application/json');
      res.send(bod);
    }
  });
});

module.exports = router;
