const deleteButtons = document.querySelectorAll('button.delete');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('button pressed. tweet id is ' + button.dataset.tweetid);
  })
})
