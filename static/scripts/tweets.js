// Handle delete and retweet buttons and confirm modal
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
        showCards(cardIndex += 1);
      } else {
        console.log('try again lol');
      }
    });
  });
}

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

// Handle tweet slideshow display
let cardIndex = 0;
const progress = document.querySelector('.progress');

showCards(cardIndex);

function nextCard () {
  console.log('inside nextCard');
  // console.log('passing ' + (cardIndex += 1) ' to showCards');
  showCards(cardIndex += 1);
}

function prevCard () {
  console.log('inside prevCard');
  // console.log('passing ' + (cardIndex -= 1) ' to showCards');
  showCards(cardIndex -= 1);
}

function showCards (index) {
  console.log('inside showCards');
  let i;
  const cards = document.getElementsByClassName('card');

  if (index >= cards.length) {
    cardIndex = 0;
  }
  if (index < 0) {
    cardIndex = cards.length - 1;
  }

  for (i = 0; i < cards.length; i++) {
    cards[i].style.display = 'none';
  }
  cards[cardIndex].style.display = 'block';
  progress.innerText = `${cardIndex + 1} / ${cards.length}`;
}

document.addEventListener('click', event => {
  if (event.target.classList.contains('prev')) {
    console.log('prev clicked');
    prevCard();
  }
  if (event.target.classList.contains('next')) {
    console.log('next clicked');
    nextCard();
  }
});
