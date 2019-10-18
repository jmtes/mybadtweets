const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const session = require('express-session');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// Set up session
// app.use(session({
//   resave: true,
//   saveUninitialized: true,
//   secret: 'sugarboy'
// }));

// Set up view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connected to mongodb');
});

// Set up routes
app.use('/auth', authRoutes);

// Create home route
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(5000, () => {
  console.log('App now listening for requests on Port 3000.');
});
