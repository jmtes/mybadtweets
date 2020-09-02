const Twit = require('promised-twit');
const math = require('mathjs');

const keys = require('../../config/keys');

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

module.exports = {
  newTwit,
  getBadTweets
};
