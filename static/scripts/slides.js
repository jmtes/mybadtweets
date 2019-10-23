let cardIndex = 0;

showCards(cardIndex);

function nextCard() {
  console.log('inside nextCard');
  // console.log('passing ' + (cardIndex += 1) ' to showCards');
  showCards(cardIndex += 1);
}

function prevCard() {
  console.log('inside prevCard');
  // console.log('passing ' + (cardIndex -= 1) ' to showCards');
  showCards(cardIndex -= 1);
}

function showCards(index) {
  console.log('inside showCards');
  let i;
  const cards = document.getElementsByClassName('card');

  if (index === cards.length) {
    cardIndex = 0;
  }
  if (index < 0) {
    cardIndex = cards.length - 1;
  }

  for (i = 0; i < cards.length; i++) {
    cards[i].style.display = 'none';
  }
  cards[cardIndex].style.display = 'block';
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
})
