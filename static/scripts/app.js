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
      ui.setUser(data.user);
      slides = new Slides(data.tweets);
      nextTweet();
    });
}

function nextTweet () {
  const nextTweet = slides.getNextTweet();
  ui.renderTweet(nextTweet);
}

function prevTweet () {
  const prevTweet = slides.getPrevTweet();
  ui.renderTweet(prevTweet);
}

// DOM content loaded event listener
document.addEventListener('DOMContentLoaded', getTweets);

// Page event listeners
document.getElementById('next').addEventListener('click', nextTweet);
document.getElementById('prev').addEventListener('click', prevTweet);

console.log('successfully transpiled!');
