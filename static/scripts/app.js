import twitter from './twitter';
import slides from './slideshow';
import ui from './ui';

// Delete tweet
const deleteTweet = () => {
  twitter.deleteTweet(slides.getCurrentID()).then((data) => {
    if (data.status === 'OK') {
      ui.showSuccess('DELETED');
      slides.recordAction('DELETED');
    } else {
      ui.showFailure('DELETED', data.errorCode);
    }
  });
};

// Retweet tweet
const bumpTweet = () => {
  twitter.bumpTweet(slides.getCurrentID()).then((data) => {
    if (data.status === 'OK') {
      ui.showSuccess('RETWEETED');
      slides.recordAction('RETWEETED');
    } else {
      ui.showFailure('RETWEETED', data.errorCode);
    }
  });
};

// Confirm tweet delete/retweet
const confirmAction = (event) => {
  if (event.target.classList.contains('btn')) {
    ui.showConfirmModal();
    const buttonID = event.target.id;
    document.getElementById('yes').addEventListener('click', () => {
      if (buttonID === 'delete-btn') {
        deleteTweet();
      } else {
        bumpTweet();
      }
    });
  }
};

// Close modal if target contains close-modal class
const clickModal = (event) => {
  if (event.target.classList.contains('close-modal')) {
    ui.hideModal();
  }
};

// Display next tweet in slideshow
const getNextTweet = () => {
  const nextTweet = slides.getNextTweet();
  ui.renderTweet(nextTweet);
};

// Display previous tweet in slideshow
const getPrevTweet = () => {
  const prevTweet = slides.getPrevTweet();
  ui.renderTweet(prevTweet);
};

// Fetch tweets from Twitter API
const getTweets = () => {
  twitter.getTweets().then((data) => {
    ui.setUser(data.user);
    slides.setTweets(data.tweets);
    ui.showTweetCount(slides.getTweetCount());
    getNextTweet();
    ui.hideLoader();
  });
};

// DOM content loaded event listener
document.addEventListener('DOMContentLoaded', getTweets);

// Page event listeners
document.getElementById('next').addEventListener('click', getNextTweet);
document.getElementById('prev').addEventListener('click', getPrevTweet);

// Button event listener
document.getElementById('panel').addEventListener('click', confirmAction);

// Modal event listener
document.getElementById('modal-bg').addEventListener('click', clickModal);
