const deleteButtons = document.querySelectorAll('.delete');
const confirmModal = document.querySelector('.confirm-modal');
const yesButton = document.querySelector('.yes');
const noButton = document.querySelector('.no');

document.addEventListener('click', event => {
  if (event.target === confirmModal) {
    confirmModal.style.display = 'none';
  }
})

function deleteTweet(button) {
  data = { tweetid: button.parentElement.dataset.tweetid };
  console.log('making request with tweet id: ' + data.tweetid);

  fetch('/api/delete', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    const responseJSON = response.json().then(data => {
      if (data.status === 'OK') {
        button.parentElement.parentElement.parentElement.remove();
      } else {
        console.log('try again lol');
      }
    });
  });
}

deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('button pressed. tweet id is ' + button.parentElement.dataset.tweetid);

    confirmModal.style.display = 'block';

    yesButton.onclick = () => {
      console.log('yes clicked');
      confirmModal.style.display = 'none';
      deleteTweet(button);
    }

    noButton.onclick = () => {
      confirmModal.style.display = 'none';
    }

    // fetch('/api/delete', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(response => {
    //   const responseJSON = response.json().then(data => {
    //     if (data.status === 'OK') {
    //       button.parentElement.remove();
    //     } else {
    //       console.log('try again lol');
    //     }
    //   });
    // });
  });
});
