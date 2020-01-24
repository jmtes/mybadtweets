const signIn = document.querySelector('.signin');
// const leave = document.querySelector('.leave');
// let rainbow;

// signIn.addEventListener('click', () => {
//   signIn.style.boxShadow = '0px 0px';
//   setTimeout(() => {
//     signIn.style.boxShadow = '-2px -2px #000';
//   }, 100);
// });

// document.addEventListener('click', event => {
//   if (event.target.classList.contains('button')) {
//     event.target.style.boxShadow = '0px 0px';
//     setTimeout(() => {
//       event.target.style.boxShadow = '-1px -1px #000';
//     }, 100);
//   }
// });

// signIn.addEventListener('mouseover', () => {
// document.querySelector('body').style.backgroundImage = 'url("static/images/fireworks.gif")';
// let r = 255, g = 0, b = 0;
// rainbow = setInterval(() => {
//   if (r > 0 && b == 0) {
//     r--;
//     g++;
//   }
//   if (g > 0 && r == 0){
//     g--;
//     b++;
//   }
//   if (b > 0 && g == 0) {
//     r++;
//     b--;
//   }
//   signIn.style.color = `rgb(${r}, ${g}, ${b})`;
//   signIn.style.fontWeight = 'bold';
// signIn.style.border = `1px solid rgb(${r}, ${g}, ${b})`;
// signIn.style.boxShadow = `-1px -1px rgb(${r}, ${g}, ${b})`;
//   }, 1);
// });

// signIn.addEventListener('mouseout', () => {
//   document.querySelector('body').style.backgroundImage = 'none';
//   clearTimeout(rainbow);
//   signIn.style.color = '#000';
//   signIn.style.fontWeight = 'normal';
// signIn.style.border = `1px solid #000`;
// signIn.style.boxShadow = `-1px -1px #000`;
// })

signIn.addEventListener('click', () => {
  setTimeout(() => {
    window.location.href = '/auth';
  }, 100);
});

// leave.addEventListener('click', () => {
//   setTimeout(() => {
//     window.history.back();
//   }, 100);
// });
