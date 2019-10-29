const express = require('express');
const passportSetup = require('./config/passport-setup');
const session = require('express-session');
// const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth-routes');
const tweetRoutes = require('./routes/tweet-routes');
const apiRoutes = require('./routes/api-routes');
const passport = require('passport');

const app = express();

const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieParser = require('cookie-parser');
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

app.use(cookieParser());
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.use('/auth', authRoutes);
app.use('/tweets', tweetRoutes);
app.use('/api', apiRoutes);

// Set up static assets folder
app.use(express.static('static'));

// Use body parser
// app.use(bodyParser.json());

// Create home route
app.get('/', (req, res) => {
  res.render('index', {
    user: req.user
  });
});

app.listen(process.env.PORT, () => {
  console.log('App now listening for requests on Port 3000.');
});
