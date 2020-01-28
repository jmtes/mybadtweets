// Tweet generator
module.exports = class Slides {
  // tweets param should be array of tweet objects
  constructor (tweets) {
    this.tweets = tweets;
    this.currentIndex = -1;
  }

  getNextTweet () {
    this.currentIndex = (this.currentIndex + 1) % this.tweets.length;
    return this.tweets[this.currentIndex];
  }
};
