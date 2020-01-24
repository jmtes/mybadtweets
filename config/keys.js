module.exports = {
  twitter: {
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET
  },
  mongodb: {
    dbURI: 'mongodb+srv://' + process.env.DBUSER + ':' + process.env.DBPWD + '@hosanna-ikelv.mongodb.net/test?retryWrites=true&w=majority'
  },
  session: {
    secret: process.env.SESSIONKEY
  }
};
