// Page event listener

// Delete button event listener

// Retweet button event listener

import { twitter } from './twitter';
import { slideshow } from './slideshow';
import { ui } from './ui';

function getTweets () {
  // Fetch tweets from Twitter API
  const tweets = twitter.getTweets(); // This should be an array of tweet objects
}

// DOM content loaded event listener
document.addEventListener('DOMContentLoaded', getTweets);

console.log('successfully transpiled!');
