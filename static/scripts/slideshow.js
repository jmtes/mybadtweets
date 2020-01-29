// Tweet generator
class Slides {
  // tweets param should be array of tweet objects
  constructor () {
    this.tweets = undefined;
    this.currentIndex = -1;
  }

  setTweets (tweets) {
    this.tweets = tweets;
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
}

export const slides = new Slides();
