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
      console.log('user is: ', data.user);
      console.log('their tweets are: ', data.tweets);
      slides = new Slides(data.tweets);
      let nextTweet = slides.getNextTweet();
      ui.setUser(data.user);
      ui.renderTweet(nextTweet);
    });
}

// DOM content loaded event listener
document.addEventListener('DOMContentLoaded', getTweets);

console.log('successfully transpiled!');
