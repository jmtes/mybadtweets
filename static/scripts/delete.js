const deleteButtons = document.querySelectorAll('button.delete');

deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('button pressed. tweet id is ' + button.dataset.tweetid);
    data = { tweetid: button.dataset.tweetid };
    console.log('data is: ', data);

    fetch('/api/delete', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(response => {
      console.log('inside callback');
      console.log(response);
      const responseJSON = response.json().then(data => {
        console.log(data);
      });
    });
  });
});
