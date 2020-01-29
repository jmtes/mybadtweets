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

  getPrevTweet () {
    this.currentIndex === 0
      ? this.currentIndex = this.tweets.length - 1
      : this.currentIndex--;
    return this.tweets[this.currentIndex];
  }
};
