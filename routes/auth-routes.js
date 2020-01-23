const router = require('express').Router();
const passport = require('passport');

// Auth with Twitter
router.get('/', passport.authenticate('twitter'));

// Auth logout
router.get('/logout', (req, res) => {
  // Handle with passport
  req.logout();
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
  });
  console.log(req.user);
  console.log(req.session);
  console.log(req.sessionID);
  res.redirect('/');
})

// Callback route for Twitter to redirect to
router.get('/redirect', passport.authenticate('twitter'), (req, res) => {
  // res.send(req.user);
  res.redirect('/tweets');
})

module.exports = router;
