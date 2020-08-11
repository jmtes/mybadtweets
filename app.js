const express = require('express');
const passportSetup = require('./config/passport-setup');
const session = require('express-session');
const authRoutes = require('./routes/auth-routes');
const tweetRoutes = require('./routes/tweet-routes');
const apiRoutes = require('./routes/api-routes');
const passport = require('passport');

const app = express();

const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const minify = require('express-minify');

// Set up session
app.use(
  session({
    name: 'session-id',
    resave: false,
    saveUninitialized: false,
    secret: keys.session.secret,
    unset: 'destroy',
    cookie: {
      maxAge: 1000 * 60 * 30 // 30 minutes
    }
  })
);

// Set up view engine
app.set('view engine', 'ejs');

// Connect to mongodb
mongoose.connect(
  keys.mongodb.dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to MongoDB.');
  }
);

app.use(cookieParser());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.use('/auth', authRoutes);
app.use('/tweets', tweetRoutes);
app.use('/api', apiRoutes);

// Set up response minification and compression
app.use(compression());
app.use(minify());

// Set up static assets folder
app.use(express.static('static'));

// Create home route
app.get('/', (req, res) => {
  // console.log(req.user);
  // console.log(req.session);
  // console.log(req.sessionID);
  res.render('index');
});

app.listen(process.env.PORT, () => {
  console.log(`App now listening on port ${PORT}.`);
});
