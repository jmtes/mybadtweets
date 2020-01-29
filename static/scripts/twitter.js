// Get tweets

// Delete/Retweet tweet
class Twitter {
  async getTweets () {
    console.log('getTweets triggered');
    // Query internal API
    let res = await window.fetch('/api/fetch');
    res = await res.json();
    return res;
  }
}

export const twitter = new Twitter();
