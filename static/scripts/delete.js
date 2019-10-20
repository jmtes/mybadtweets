const deleteButtons = document.querySelectorAll('button.delete');

deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('button pressed. tweet id is ' + button.dataset.tweetid);
    data = { tweetid: button.dataset.tweetid };

    fetch('/api/delete', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      const responseJSON = response.json().then(data => {
        console.log(data);
      });
    });
  });
});
