// Page event listener

// Delete button event listener

// Retweet button event listener

import { twitter } from './twitter';
import { slideshow } from './slideshow';
import { ui } from './ui';

function getTweets () {
  // Fetch tweets from Twitter API
  let tweets;
  twitter.getTweets()
    .then(data => {
      tweets = data;
      console.log('tweets is ', tweets); // This should be an array of tweet objects
    });
}

// DOM content loaded event listener
document.addEventListener('DOMContentLoaded', getTweets);

console.log('successfully transpiled!');
