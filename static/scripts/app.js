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
  twitter.getTweets()
    .then(data => {
      slides = new Slides(data);
      let nextTweet = slides.getNextTweet();
      ui.renderTweet(nextTweet);
    });
}

// DOM content loaded event listener
document.addEventListener('DOMContentLoaded', getTweets);

console.log('successfully transpiled!');
