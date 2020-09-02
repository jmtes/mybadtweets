const router = require('express').Router();

const authCheck = require('./auth-check');

router.get('/', authCheck, (req, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.render('tweets');
});

module.exports = router;
