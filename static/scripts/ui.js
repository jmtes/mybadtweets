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
    this.modal = document.getElementById('modal-bg');
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

  showConfirmModal () {
    this.modalMessage.textContent = 'ARE YOU SURE?';

    // Create option buttons
    const yesButton = document.createElement('span');
    yesButton.id = 'yes';
    yesButton.className = 'modal-btn cursor-pointer hover:text-shadow-tweet hover:tracking-button';
    yesButton.textContent = 'YES';

    const noButton = document.createElement('span');
    noButton.id = 'no';
    noButton.className = 'close-modal modal-btn cursor-pointer hover:text-shadow-tweet hover:tracking-button';
    noButton.textContent = 'NO';

    // Remove any existing option buttons
    this.clearModalOptions();

    // Add option buttons to DOM
    this.modalOptions.appendChild(yesButton);
    this.modalOptions.appendChild(noButton);

    // Unhide modal
    this.modal.classList.remove('hidden');
  }

  showSuccess (action) {
    this.modalMessage.textContent = `TWEET SUCCESSFULLY ${action}`;

    // Create option button
    const okButton = document.createElement('span');
    okButton.className = 'close-modal modal-btn cursor-pointer hover:text-shadow-tweet hover:tracking-button';
    okButton.textContent = 'OK';

    // Remove any existing option buttons
    this.clearModalOptions();

    // Add button to DOM
    this.modalOptions.appendChild(okButton);

    // Change message in tweet card
    this.message.textContent = this.showActionMessage(action);
  }

  showActionMessage (action) {
    if (action === 'DELETED') {
      return 'YOU DELETED THIS RECENTLY! PERHAPS IT WAS FOR THE BEST';
    } else {
      return 'YOU BUMPED THIS RECENTLY! HOPE IT DOES NUMBERS THIS TIME CHIEF!';
    }
  }

  hideModal () {
    this.modal.classList.add('hidden');
  }

  clearModalOptions () {
    while (this.modalOptions.firstChild) {
      this.modalOptions.removeChild(this.modalOptions.firstChild);
    }
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
