document.addEventListener('click', event => {
  if (event.target.classList.contains('button')) {
    event.target.style.boxShadow = '0px 0px';
    setTimeout(() => {
      event.target.style.boxShadow = '-1px -1px #000';
    }, 100);
  }
});
