const deleteButtons = document.querySelectorAll('button.delete');

deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('button pressed. tweet id is ' + button.dataset.tweetid);
    const response = await fetch('/api/delete');
    const responseJSON = await response.json();
    console.log(JSON.stringify(myJSON));
  })
})
