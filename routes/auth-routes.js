const router = require('express').Router();
const passport = require('passport');

// Auth login
router.get('/login', (req, res) => {
  res.render('login');
});

// Auth logout
router.get('/logout', (req, res) => {
  // Handle with passport
  res.send('Logging out');
})

// Auth with Twitter
router.get('/twitter', passport.authenticate('twitter'));

// Callback route for Twitter to redirect to
router.get('/twitter/redirect', passport.authenticate('twitter'), (req, res) => {
  res.send('You reached the callback URI');
})

module.exports = router;