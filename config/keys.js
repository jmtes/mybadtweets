/**
 * This module exports an object containing the keys used to configure the app.
 * Please refer to the README for instructions on setting them up if you haven't
 * already.
 */

module.exports = {
  twitter: {
    consumerKey: process.env.MBT_CONSUMERKEY,
    consumerSecret: process.env.MBT_CONSUMERSECRET,
    callbackURL: process.env.MBT_CALLBACKURL
  },
  mongodb: {
    dbURI: process.env.MBT_DBURI
  },
  session: {
    secret: process.env.MBT_SESSIONSECRET
  }
};
