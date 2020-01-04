# mybadtweets
mybadtweets is a web app that shows you your least popular tweets.

## Getting Started
The app is deployed on Heroku, but if you want to play with the code yourself then follow these steps:

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
export PORT=3000
```
4. In order for the app to run, the environment variables `CONSUMERKEY` and `CONSUMERSECRET` need to be set to your Twitter API consumer key and secret. You need to register for a Twitter developer account and then create an app to be given these, which [this page](https://developer.twitter.com/en/docs/basics/getting-started) outlines how to do if you haven't already.
```
export CONSUMERKEY=yourAPIKey
export CONSUMERSECRET=yourAPISecretKey
```
