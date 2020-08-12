class Twitter {
  // Query internal API
  async getTweets() {
    let res = await window.fetch('/api/fetch');
    res = await res.json();
    return res;
  }

  // Delete tweet
  async deleteTweet(tweetid) {
    let res = await window.fetch('/api/delete', {
      method: 'POST',
      body: JSON.stringify({ tweetid }),
      headers: { 'Content-Type': 'application/json' }
    });
    res = await res.json();
    return res;
  }

  // Retweet tweet
  async bumpTweet(tweetid) {
    let res = await window.fetch('/api/retweet', {
      method: 'POST',
      body: JSON.stringify({ tweetid }),
      headers: { 'Content-Type': 'application/json' }
    });
    res = await res.json();
    return res;
  }
}

export const twitter = new Twitter();
