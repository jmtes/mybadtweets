const router = require('express').Router();
const bodyParser = require('body-parser').json();

const authCheck = require('./middleware/auth-check');
const { newTwit, getBadTweets } = require('./utils/twitter');

router.get('/fetch', authCheck, (req, res) => {
  let tweetArray = [];
  let i = 16;

  const params = {
    screen_name: req.user.username,
    count: 200,
    trim_user: true,
    exclude_replies: true,
    include_rts: false,
    tweet_mode: 'extended'
  };

  const client = newTwit(req);

  client.get('statuses/user_timeline', params, function makeTweetList(
    _err,
    data
  ) {
    tweetArray = tweetArray.concat(data);
    params.max_id = tweetArray[tweetArray.length - 1].id;
    i -= 1;
    if (i) {
      client.get('statuses/user_timeline', params, makeTweetList);
    } else {
      res.send(
        JSON.stringify({
          user: req.user.username,
          tweets: getBadTweets(tweetArray)
        })
      );
    }
  });
});

router.post('/delete', authCheck, bodyParser, (req, res) => {
  const bod = {
    status: undefined,
    errorCode: undefined
  };

  const endpoint = `statuses/destroy/${req.body.tweetid}`;

  const client = newTwit(req);

  client.post(endpoint, (err) => {
    if (!err) {
      bod.status = 'OK';
      res.set('Content-Type', 'application/json');
      res.send(bod);
    } else {
      bod.status = 'FAIL';
      bod.errorCode = err.code;
      res.set('Content-Type', 'application/json');
      res.send(bod);
    }
  });
});

router.post('/retweet', authCheck, bodyParser, (req, res) => {
  const bod = {
    status: undefined,
    errorCode: undefined
  };

  const endpoint = `statuses/retweet/${req.body.tweetid}`;

  const client = newTwit(req);

  client.post(endpoint, (err) => {
    if (!err) {
      bod.status = 'OK';
      res.set('Content-Type', 'application/json');
      res.send(bod);
    } else {
      bod.status = 'FAIL';
      bod.errorCode = err.code;
      res.set('Content-Type', 'application/json');
      res.send(bod);
    }
  });
});

module.exports = router;
