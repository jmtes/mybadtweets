const express = require('express');
const passportSetup = require('./config/passport-setup');
const session = require('express-session');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passport = require('passport');

const app = express();

const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');

// Set up session
// app.use(session({
//   resave: true,
//   saveUninitialized: true,
//   secret: 'sugarboy'
// }));

// Set up view engine
app.set('view engine', 'ejs');

// Connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connected to mongodb');
});

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Create home route
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(5000, () => {
  console.log('App now listening for requests on Port 3000.');
});
