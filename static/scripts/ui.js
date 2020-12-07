/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getActionMessage", "getErrorMessage", "getDateString"] }] */

import messages from './messages';

class UI {
  // Set UI elements
  constructor() {
    this.subtitle = document.getElementById('subtitle');
    this.loader = document.getElementById('loader');
    this.slide = document.getElementById('slide');
    this.tweetDate = document.getElementById('date');
    this.tweetText = document.getElementById('tweet-text');
    this.likeCount = document.getElementById('like-count');
    this.likePlurality = document.getElementById('like-plurality');
    this.message = document.getElementById('message');
    this.panel = document.getElementById('panel');
    this.tweetIndex = document.getElementById('tweet-index');
    this.tweetCount = document.getElementById('tweet-count');
    this.modal = document.getElementById('modal-bg');
    this.modalMessage = document.getElementById('modal-message');
    this.modalOptions = document.getElementById('modal-options');
    this.user = undefined;
    this.messageArr = messages;
  }

  // Display tweet
  renderTweet(tweet) {
    // Make date string
    const date = this.getDateString(tweet.data.created_at);
    this.tweetDate.textContent = date;
    this.tweetText.textContent = `"${tweet.data.full_text}"`;
    // Set link href
    this.tweetText.setAttribute('href', this.getTweetURL(tweet.data));
    this.likeCount.textContent = String(tweet.data.favorite_count);

    this.likePlurality.textContent =
      tweet.data.favorite_count === 1 ? 'like' : 'likes';

    this.message.textContent = tweet.data.actionTaken
      ? this.getActionMessage(tweet.data.actionTaken)
      : this.getRandomMessage();

    this.updateIndex(tweet.index);
  }

  // Hide loader
  hideLoader() {
    this.subtitle.textContent = 'HERE ARE THOSE SHITTY TWEETS YOU ORDERED';
    this.loader.classList.add('hidden');
    this.slide.classList.remove('hidden');
    this.panel.classList.remove('hidden');
  }

  // Update index in tweet pagination
  updateIndex(index) {
    this.tweetIndex.textContent = String(index);
  }

  // Show total number of tweets
  showTweetCount(totalTweets) {
    this.tweetCount.textContent = String(totalTweets);
  }

  // Show modal to confirm user action
  showConfirmModal() {
    this.modalMessage.textContent = 'ARE YOU SURE?';

    // Create option buttons
    const yesButton = document.createElement('span');
    yesButton.id = 'yes';
    yesButton.className =
      'modal-btn cursor-pointer hover:text-shadow-tweet hover:tracking-button';
    yesButton.textContent = 'YES';

    const noButton = document.createElement('span');
    noButton.id = 'no';
    noButton.className =
      'close-modal modal-btn cursor-pointer hover:text-shadow-tweet hover:tracking-button';
    noButton.textContent = 'NO';

    // Remove any existing option buttons
    this.clearModalOptions();

    // Add option buttons to DOM
    this.modalOptions.appendChild(yesButton);
    this.modalOptions.appendChild(noButton);

    // Unhide modal
    this.modal.classList.remove('hidden');
  }

  // Notify user of successful action
  showSuccess(action) {
    this.modalMessage.textContent = `TWEET SUCCESSFULLY ${action}`;

    // Create option button
    const okButton = document.createElement('span');
    okButton.className =
      'close-modal modal-btn cursor-pointer hover:text-shadow-tweet hover:tracking-button';
    okButton.textContent = 'OK';

    // Remove any existing option buttons
    this.clearModalOptions();

    // Add button to DOM
    this.modalOptions.appendChild(okButton);

    // Change message in tweet card
    this.message.textContent = this.getActionMessage(action);
  }

  // Alert user of action failure
  showFailure(action, errorCode) {
    this.modalMessage.textContent = this.getErrorMessage(action, errorCode);

    // Create option button
    const okButton = document.createElement('span');
    okButton.className =
      'close-modal modal-btn cursor-pointer hover:text-shadow-tweet hover:tracking-button';
    okButton.textContent = 'OK';

    // Remove any existing option buttons
    this.clearModalOptions();

    // Add button to DOM
    this.modalOptions.appendChild(okButton);
  }

  // Hide modal
  hideModal() {
    this.modal.classList.add('hidden');
  }

  // Remind user of action previously taken on a tweet
  getActionMessage(action) {
    if (action === 'DELETED') {
      return 'YOU DELETED THIS RECENTLY! PERHAPS IT WAS FOR THE BEST';
    }
    return 'YOU BUMPED THIS RECENTLY! HOPE IT DOES NUMBERS THIS TIME CHIEF!';
  }

  // Let user know what they did wrong
  getErrorMessage(action, errorCode) {
    if (action === 'DELETED' && errorCode === 144) {
      return "YOU CAN'T DELETE A TWEET TWICE! NO MATTER HOW BAD IT WAS!";
    }
    if (action === 'RETWEETED' && errorCode === 144) {
      return "YOU CAN'T RETWEET A TWEET THAT DOESN'T EXIST!";
    }
    if (errorCode === 327) {
      return "YOU CAN'T RETWEET THIS TWICE! IT WASN'T EVEN THAT GOOD!";
    }
    return 'HMM, SOMETHING WENT WRONG. TRY AGAIN LATER.';
  }

  // Get message to display alongside tweet
  getRandomMessage() {
    return this.messageArr[
      Math.floor(Math.random() * Math.floor(this.messageArr.length))
    ];
  }

  // Clear modal options
  clearModalOptions() {
    while (this.modalOptions.firstChild) {
      this.modalOptions.removeChild(this.modalOptions.firstChild);
    }
  }

  // date param should be the created_at property of a tweet
  getDateString(date) {
    date = date.split(' ');
    const month = date[1].toLowerCase();
    const day = date[2];
    const year = date[5];
    return `${month} ${day}, ${year}`;
  }

  // Get tweet URL
  getTweetURL(tweet) {
    return `https://twitter.com/${this.user}/status/${tweet.id_str}`;
  }

  // Set user
  setUser(username) {
    this.user = username;
  }
}

const ui = new UI();

export default ui;
