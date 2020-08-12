![The working mybadtweets logo](https://i.imgur.com/EQHVX3U.png)

# mybadtweets

mybadtweets is a web app that fetches your tweets, calculates the average amount of likes you get, and shows you all the tweets whose likes fall much below that average. It was made in the name of light-hearted self-deprecation.

## Setup for Development

Clone the repo and `cd` into it.

```
git clone https://github.com/jmtes/mybadtweets.git
cd mybadtweets
```

Install the dependencies.

```
npm install
```

Set the port you want the app to listen to.
In this example, port 3000 is used. Port 3000 is also the default port.

```
export MBT_PORT=3000
```

The environment variables `MBT_CONSUMER_KEY` and `MBT_CONSUMER_SECRET` need to be set to your Twitter API consumer key and secret.
You need to register for a Twitter developer account and then create an app to be given these, which [this page](https://developer.twitter.com/en/docs/basics/getting-started) outlines how to do if you haven't already.
Be sure to specify `http://localhost:MBT_PORT/auth/redirect` as a callback URL for your app, with `MBT_PORT` being the number you configured in the previous step. Then set the `MBT_CALLBACK_URL` variable.

```
export MBT_CONSUMER_KEY=yourAPIKey
export MBT_CONSUMER_SECRET=yourAPISecretKey
export MBT_CALLBACK_URL='/auth/redirect'
```

The app also needs to connect to a MongoDB Atlas cluster to run (refer to [this page](https://docs.atlas.mongodb.com/getting-started/) if you need to create one).
Once you've created your cluster, visit the "Clusters" panel on the MongoDB homepage and click "Connect" in your cluster's listing.
From there, click "Connect Your Application" and set the driver to Node.js with version 3.0 or later.
Copy the connection string and set the `MBT_DB_URI` variable to it, making sure to put it in quotation marks lest errors ensue.

```
export MBT_DB_URI='yourDBURI'
```

Lastly, set your session secret. This can be anything you want but I'd recommend [generating a random string](https://www.random.org/strings/).

```
export MBT_SESSION_SECRET=yourSessionSecret
```

Now you can build the app, start it, and open it in your browser!

```
npm run build
npm run start
```

![The UI](https://i.imgur.com/EmA69Me.png)

## Future Features

- Quote-retweet functionality
- Ability to jump to a specific tweet
- Ability to specify amount of tweets to display
- Image rendering
- A tweet statistics panel
- Toggle between mean messages, nice messages, and no messages
- Toggle between slideshow, list, and grid views
- Dark mode
- Laugh track that plays with each tweet displayed as one progresses through the slidshow

## Built With

- [EJS](https://ejs.co) - templating engine
- [Express](https://expressjs.com/) - web application framework
- [math.js](https://mathjs.org/) - library used to calculate tweet statistics
- [Mongoose](https://mongoosejs.com) - ODM
- [Passport.js](http://www.passportjs.org/) - middleware used for twitter authentication
- [twit](https://www.npmjs.com/package/twit) - twitter API client
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

## Contributing and Future Developments

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

App development progress is being tracked [here](https://trello.com/b/kqxbjGpU/mybadtweets) on Trello! Any issues opened will be added to the board.

## Authors

- Juno Tesoro is a frontend developer and certified bad tweeter. You can find them on [Github](https://github.com/jmtes), [Linkedin](https://www.linkedin.com/in/jutesoro/), and, of course, [Twitter](https://twitter.com/jumicates).

## Acknowledgements

- Robert Glatzel - [Github](https://github.com/robertglatzel)
- [The Net Ninja](https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg)
