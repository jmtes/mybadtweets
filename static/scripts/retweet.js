const retweetButtons = document.querySelectorAll('.retweet');

retweetButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('button pressed. tweet id is ' + button.parentElement.dataset.tweetid);
    data = { tweetid: button.parentElement.dataset.tweetid };

    fetch('/api/retweet', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      const responseJSON = response.json().then(data => {
        if (data.status === 'OK') {
          button.parentElement.remove();
        } else {
          console.log('try again lol');
        }
      });
    });
  });
});
