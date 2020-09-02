// Check if user is logged in
const authCheck = (req, res, next) => {
  if (!req.user) {
    // User is not logged in, redirect to auth page
    res.redirect('/auth');
  } else {
    // User is logged in, proceed
    next();
  }
};

module.exports = authCheck;
