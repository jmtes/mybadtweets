// Page event listener

// Delete button event listener

// Retweet button event listener

var Twitter = require('./twitter');
var UI = require('./ui');
var Slides = require('./slideshow');

var twitter = new Twitter();
var ui = new UI();
var slides;

console.log('twitter obj: ', twitter);
console.log('ui obj: ', ui);
console.log('slides obj: ', slides);

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
