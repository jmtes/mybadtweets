/**
 * This module exports an object containing the keys used to configure the app.
 * Please refer to the README for instructions on setting them up if you haven't
 * already.
 */

module.exports = {
  twitter: {
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
    callbackURL: process.env.CALLBACKURL
  },
  mongodb: {
    dbURI: process.env.DBURI
  },
  session: {
    secret: process.env.SESSIONKEY
  }
};
