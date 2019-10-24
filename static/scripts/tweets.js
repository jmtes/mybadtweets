// Handle delete and retweet buttons
const confirmModal = document.querySelector('.confirm-modal');
const yesButton = document.querySelector('.yes');
const noButton = document.querySelector('.no');

document.addEventListener('click', event => {
  if (event.target === confirmModal) {
    confirmModal.style.display = 'none';
  }
});

function tweetAction (button) {
  const data = { tweetid: button.parentElement.dataset.tweetid };
  console.log('making request with tweet id: ' + data.tweetid);
  let endpoint;

  if (button.classList.contains('delete')) {
    console.log('delete was pressed');
    endpoint = '/api/delete';
  } else {
    console.log('retweet was pressed');
    endpoint = '/api/retweet';
  }

  fetch(endpoint, {
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

// buttons.forEach(button => {
//   button.addEventListener('click', () => {
//     console.log('button pressed. tweet id is ' + button.parentElement.dataset.tweetid);

//     confirmModal.style.display = 'block';

//     yesButton.onclick = () => {
//       console.log('yes clicked');
//       confirmModal.style.display = 'none';
//       deleteTweet(button);
//     }

//     noButton.onclick = () => {
//       confirmModal.style.display = 'none';
//     }
//   });
// });

document.addEventListener('click', event => {
  if (event.target.classList.contains('button')) {
    const button = event.target;
    console.log('button pressed. tweet id is ' + button.parentElement.dataset.tweetid);

    confirmModal.style.display = 'block';

    yesButton.onclick = () => {
      console.log('yes clicked');
      confirmModal.style.display = 'none';
      tweetAction(button);
    };

    noButton.onclick = () => {
      confirmModal.style.display = 'none';
    };
  }
});
