// Retweet button event listener

import { twitter } from './twitter';
import { slides } from './slideshow';
import { ui } from './ui';

console.log('twitter obj: ', twitter);
console.log('ui obj: ', ui);
console.log('slides obj: ', slides);

function getTweets () {
  // Fetch tweets from Twitter API
  twitter.getTweets()
    .then(data => {
      console.log('user is: ', data.user);
      console.log('their tweets are: ', data.tweets);
      ui.setUser(data.user);
      slides.setTweets(data.tweets);
      ui.showTweetCount(slides.getTweetCount());
      nextTweet();
    });
}

function deleteTweet () {
  twitter.deleteTweet(slides.getCurrentID())
    .then(data => {
      if (data.status === 'OK') {
        ui.showSuccess('DELETED');
      } else {
        ui.showFailure('DELETED', data.errorCode);
      }
    });
}

function bumpTweet () {
  twitter.bumpTweet(slides.getCurrentID())
    .then(data => {
      if (data.status === 'OK') {
        ui.showSuccess('RETWEETED');
      } else {
        ui.showFailure('RETWEETED', data.errorCode);
      }
    });
}

function confirmAction (event) {
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

function clickModal (event) {
  if (event.target.classList.contains('close-modal')) {
    ui.hideModal();
  }
}

function nextTweet () {
  const nextTweet = slides.getNextTweet();
  ui.renderTweet(nextTweet);
  // ui.updateIndex(slides.getCurrentIndex());
}

function prevTweet () {
  const prevTweet = slides.getPrevTweet();
  ui.renderTweet(prevTweet);
  // ui.updateIndex(slides.getCurrentIndex());
}

// DOM content loaded event listener
document.addEventListener('DOMContentLoaded', getTweets);

// Page event listeners
document.getElementById('next').addEventListener('click', nextTweet);
document.getElementById('prev').addEventListener('click', prevTweet);

// Button event listener
document.getElementById('panel').addEventListener('click', confirmAction);

// Modal event listener
document.getElementById('modal-bg').addEventListener('click', clickModal);

console.log('successfully transpiled!');
