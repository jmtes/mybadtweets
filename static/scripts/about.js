const aboutLink = document.querySelector('.about');
const aboutModal = document.querySelector('.about-modal');

aboutLink.addEventListener('click', () => {
  aboutModal.style.display = 'block';
})

document.addEventListener('click', (event) => {
  if (event.target === aboutModal) {
    aboutModal.style.display = 'none';
  }
})
