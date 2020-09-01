const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const minify = require('express-minify');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { v4: uuid } = require('uuid');

const authRoutes = require('./routes/auth-routes');
const tweetRoutes = require('./routes/tweet-routes');
const apiRoutes = require('./routes/api-routes');
const keys = require('./config/keys');

// eslint-disable-next-line no-unused-vars
const passportSetup = require('./config/passport-setup');

const app = express();

// Set up session store
const store = new MongoDBStore({
  uri: keys.mongodb.dbURI,
  collection: 'sessions',
  expires: 1000 * 60 * 30
});

store.on('error', (err) => console.log(err));

// Set up session
app.use(
  session({
    name: 'mbt-session',
    genid: () => uuid(),
    store,
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
  res.render('index');
});

const PORT = process.env.MBT_PORT || 3000;

app.listen(PORT, () => {
  console.log(`App now listening on port ${PORT}.`);
});
