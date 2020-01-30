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

  async deleteTweet (tweetid) {
    let res = await window.fetch('/api/delete', {
      method: 'POST',
      body: JSON.stringify({ tweetid }),
      headers: { 'Content-Type': 'application/json' }
    });
    res = await res.json();
    return res;
  }

  async bumpTweet (tweetid) {
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
