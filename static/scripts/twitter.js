// Get tweets

// Delete/Retweet tweet
class Twitter {
  getTweets () {
    console.log('getTweets triggered');
    // Query internal API
    window.fetch('/api/fetch')
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }
}

export const twitter = new Twitter();
