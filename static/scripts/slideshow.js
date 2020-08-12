// Slideshow class
class Slides {
  // tweets param should be array of tweet objects
  constructor() {
    this.tweets = undefined;
    this.currentIndex = -1;
  }

  // Populate tweets
  setTweets(tweets) {
    this.tweets = tweets;
  }

  // Get next tweet
  getNextTweet() {
    this.currentIndex = (this.currentIndex + 1) % this.tweets.length;
    return {
      data: this.tweets[this.currentIndex],
      index: this.currentIndex + 1
    };
  }

  // Get previous tweet
  getPrevTweet() {
    this.currentIndex === 0
      ? (this.currentIndex = this.tweets.length - 1)
      : this.currentIndex--;
    return {
      data: this.tweets[this.currentIndex],
      index: this.currentIndex + 1
    };
  }

  // Take note of whether a tweet has recently been deleted or retweeted
  recordAction(action) {
    if (action === 'DELETED') {
      this.tweets[this.currentIndex].actionTaken = 'DELETED';
    } else {
      this.tweets[this.currentIndex].actionTaken = 'RETWEETED';
    }
  }

  // Get number of tweets
  getTweetCount() {
    return this.tweets.length;
  }

  // Get index of current tweet
  getCurrentIndex() {
    return this.currentIndex + 1;
  }

  // Get id of current tweet
  getCurrentID() {
    return this.tweets[this.currentIndex].id_str;
  }
}

export const slides = new Slides();
