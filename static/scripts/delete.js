const deleteButtons = document.querySelectorAll('button.delete');

deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('button pressed. tweet id is ' + button.dataset.tweetid);
    fetch('/api/delete', {
      method: 'POST',
      body: JSON.stringify({
        tweetid: button.dataset.tweetid
      }),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(response => {
      console.log('inside callback');
      console.log(response);
      const responseJSON = response.json().then( () => {
        console.log(JSON.stringify(responseJSON));
      });
    });
  });
});
