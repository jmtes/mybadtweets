// Show confirm modal

// Hide confirm modal

// Render tweet to screen

module.exports = class UI {
  constructor () {
    this.tweetDate = document.getElementById('date');
    this.tweetText = document.getElementById('tweet-text');
    this.likeCount = document.getElementById('like-count');
    this.message = document.getElementById('message');
    this.tweetIndex = document.getElementById('tweet-index');
    this.tweetCount = document.getElementById('tweet-count');
    this.modalMessage = document.getElementById('modal-message');
    this.modalOptions = document.getElementById('modal-options');
  }
};
