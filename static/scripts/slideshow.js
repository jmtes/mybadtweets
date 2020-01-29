// Tweet generator
module.exports = class Slides {
  // tweets param should be array of tweet objects
  constructor (tweets) {
    this.tweets = tweets;
    this.currentIndex = -1;
  }

  getNextTweet () {
    this.currentIndex = (this.currentIndex + 1) % this.tweets.length;
    return {
      data: this.tweets[this.currentIndex],
      index: this.currentIndex + 1
    };
  }

  getPrevTweet () {
    this.currentIndex === 0
      ? this.currentIndex = this.tweets.length - 1
      : this.currentIndex--;
    return {
      data: this.tweets[this.currentIndex],
      index: this.currentIndex + 1
    };
  }

  getTweetCount () {
    return this.tweets.length;
  }

  getCurrentIndex () {
    return this.currentIndex + 1;
  }
};
