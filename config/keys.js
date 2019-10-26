module.exports = {
  twitter: {
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
  },
  mongodb: {
    dbURI: process.env.DBURI
  },
  session: {
    cookieKey: 'star'
  }
};
