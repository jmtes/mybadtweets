const router = require('express').Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    // If user is not logged in
    res.redirect('/auth');
  } else {
    // If user is logged in
    next();
  }
};

router.get('/', authCheck, (req, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  // console.log(req.user);
  // console.log(req.session);
  // console.log(req.sessionID);
  res.render('tweets');
});

module.exports = router;
