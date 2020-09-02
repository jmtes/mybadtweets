const Twit = require('promised-twit');
const math = require('mathjs');

const keys = require('../../config/keys');

// Create new Twit instance from user info
const newTwit = ({ accessToken, accessTokenSecret }) => {
  return new Twit({
    consumer_key: keys.twitter.consumerKey,
    consumer_secret: keys.twitter.consumerSecret,
    access_token: accessToken,
    access_token_secret: accessTokenSecret
  });
};

// Determine how few likes a tweet must have to be considered "bad"
// @param tweets - array of tweet objects
const calcLikeThreshold = (tweets) => {
  const tweetLikes = tweets.map((tweet) => tweet.favorite_count);

  const avg = Math.round(math.mean(tweetLikes));

  // Return average divided by 4 (sophisticated, I know!)
  return Math.round(avg / 4);
};

// Filter the bad tweets
// @param tweets - array of tweet objects
const getBadTweets = (tweets) => {
  const likeThreshold = calcLikeThreshold(tweets);

  // Return filtered array
  return tweets.filter((tweet) => tweet.favorite_count <= likeThreshold);
};

module.exports = {
  newTwit,
  getBadTweets
};
