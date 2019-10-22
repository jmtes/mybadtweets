module.exports = {
  twitter: {
    consumerKey: process.env.CONSUMERKEY,
    consumerSecret: process.env.CONSUMERSECRET,
  },
  mongodb: {
    dbURI: `mongodb+srv://${process.env.MONGODBUSER}:${process.env.MONGODBPWD}@hosanna-ikelv.mongodb.net/test?retryWrites=true&w=majority`
  },
  session: {
    cookieKey: 'star'
  }
};
