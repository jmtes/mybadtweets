![The working mybadtweets logo](https://i.imgur.com/EQHVX3U.png)

# mybadtweets

mybadtweets is a web app that shows you your least popular tweets.

## Setup for Development

1. Clone the repo and `cd` into it.

```
git clone https://github.com/jmtes/mybadtweets.git
cd mybadtweets
```

2. Install the dependencies.

```
npm install
```

3. Set the port you want the app to listen to. In this example, port 3000 is used.

```
export MBT_PORT=3000
```

4. In order for the app to run, the environment variables `MBT_CONSUMER_KEY` and `MBT_CONSUMER_SECRET` need to be set to your Twitter API consumer key and secret. You need to register for a Twitter developer account and then create an app to be given these, which [this page](https://developer.twitter.com/en/docs/basics/getting-started) outlines how to do if you haven't already. Be sure to specify `http://localhost:MBT_PORT/auth/redirect` as a callback URL for your app, with `MBT_PORT` being the number you configured in the previous step. Then set the environment variable `MBT_CALLBACK_URL`.

```
export MBT_CONSUMER_KEY=yourAPIKey
export MBT_CONSUMER_SECRET=yourAPISecretKey
export MBT_CALLBACK_URL='/auth/redirect'
```

5. The app also needs to connect to a MongoDB Atlas cluster to run (refer to [this page](https://docs.atlas.mongodb.com/getting-started/) if you need to create one). Once you've created your cluster, visit the "Clusters" panel on the MongoDB homepage and click "Connect" in your cluster's listing. From there, click "Connect Your Application" and set the driver to Node.js with version 3.0 or later. Copy the connection string and set the `MBT_DB_URI` variable to it, making sure to put it in quotation marks lest errors ensue.

```
export MBT_DB_URI='yourDBURI'
```

6. Lastly, set your session secret. This can be anything you want but I'd recommend [generating a random string](https://www.random.org/strings/).

```
export MBT_SESSION_SECRET=yourSessionSecret
```

7. Now you can run the app and open it in your browser!

```
node app.js
```

## Built With

- [EJS](https://ejs.co) - the templating engine used
- [Express](https://expressjs.com/) - the web application framework used
- [math.js](https://mathjs.org/) - library used to calculate tweet statistics
- [Mongoose](https://mongoosejs.com) - the ODM used
- [Passport.js](http://www.passportjs.org/) - middleware used for twitter authentication
- [twit](https://www.npmjs.com/package/twit) - twitter API client used
- [Tailwind CSS](https://tailwindcss.com/) - the CSS framework used

## Contributing and Future Developments

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

App development progress is being tracked [here](https://trello.com/b/kqxbjGpU/mybadtweets) on Trello! Any issues opened will be added to the board.

## Authors

- Julienne Tesoro - [Github](https://github.com/jmtes) - [Linkedin](https://www.linkedin.com/in/julienne-tesoro-72156817a/)

## Acknowledgements

- Robert Glatzel - [Github](https://github.com/robertglatzel)
- [The Net Ninja](https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg)
