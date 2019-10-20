const deleteButtons = document.querySelectorAll('button.delete');

deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('button pressed. tweet id is ' + button.dataset.tweetid);
    fetch('/api/delete', {
      method: 'GET',
      body: JSON.stringify({
        tweetid: button.dataset.tweetid
      })
    }).then(response => {
      const responseJSON = response.json();
      console.log(JSON.stringify(responseJSON));
    });
  });
});
