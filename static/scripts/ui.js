// Show confirm modal

// Hide confirm modal

// Render tweet to screen

class UI {
  constructor () {
    this.tweetDate = document.getElementById('date');
    this.tweetText = document.getElementById('tweet-text');
    this.likeCount = document.getElementById('like-count');
    this.likePlurality = document.getElementById('like-plurality');
    this.message = document.getElementById('message');
    this.tweetIndex = document.getElementById('tweet-index');
    this.tweetCount = document.getElementById('tweet-count');
    this.modalMessage = document.getElementById('modal-message');
    this.modalOptions = document.getElementById('modal-options');
    this.user = undefined;
  }

  renderTweet (tweet) {
    // Make date string
    const date = this.getDateString(tweet.data.created_at);
    this.tweetDate.textContent = date;
    this.tweetText.textContent = `"${tweet.data.full_text}"`;
    // Set link href
    this.tweetText.setAttribute('href', this.getTweetURL(tweet.data));
    this.likeCount.textContent = String(tweet.data.favorite_count);
    tweet.data.favorite_count === 1
      ? this.likePlurality.textContent = 'like'
      : this.likePlurality.textContent = 'likes';
    this.updateIndex(tweet.index);
  }

  updateIndex (index) {
    this.tweetIndex.textContent = String(index);
  }

  showTweetCount (totalTweets) {
    this.tweetCount.textContent = String(totalTweets);
  }

  // date param should be the created_at property of a tweet
  getDateString (date) {
    date = date.split(' ');
    const month = date[1].toLowerCase();
    const day = date[2];
    const year = date[5];
    return `${month} ${day}, ${year}`;
  }

  getTweetURL (tweet) {
    return `https://twitter.com/${this.user}/status/${tweet.id_str}`;
  }

  // Set user
  setUser (username) {
    this.user = username;
  }
}

export const ui = new UI();
