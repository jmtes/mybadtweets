// Retweet button event listener

import { twitter } from './twitter';
import { slides } from './slideshow';
import { ui } from './ui';

const getTweets = () => {
  // Fetch tweets from Twitter API
  twitter.getTweets().then((data) => {
    ui.setUser(data.user);
    slides.setTweets(data.tweets);
    ui.showTweetCount(slides.getTweetCount());
    nextTweet();
    ui.hideLoader();
  });
};

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

const clickModal = (event) => {
  if (event.target.classList.contains('close-modal')) {
    ui.hideModal();
  }
};

const nextTweet = () => {
  const nextTweet = slides.getNextTweet();
  ui.renderTweet(nextTweet);
};

const prevTweet = () => {
  const prevTweet = slides.getPrevTweet();
  ui.renderTweet(prevTweet);
};

// DOM content loaded event listener
document.addEventListener('DOMContentLoaded', getTweets);

// Page event listeners
document.getElementById('next').addEventListener('click', nextTweet);
document.getElementById('prev').addEventListener('click', prevTweet);

// Button event listener
document.getElementById('panel').addEventListener('click', confirmAction);

// Modal event listener
document.getElementById('modal-bg').addEventListener('click', clickModal);
