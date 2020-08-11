/**
 * This module exports an object containing the keys used to configure the app.
 * Please refer to the README for instructions on setting them up if you haven't
 * already.
 */

module.exports = {
  twitter: {
    consumerKey: process.env.MBT_CONSUMER_KEY,
    consumerSecret: process.env.MBT_CONSUMER_SECRET,
    callbackURL: process.env.MBT_CALLBACK_URL
  },
  mongodb: {
    dbURI: process.env.MBT_DB_URI
  },
  session: {
    secret: process.env.MBT_SESSION_SECRET
  }
};
