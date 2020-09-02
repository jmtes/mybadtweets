/* eslint-disable no-await-in-loop */
const router = require('express').Router();
const bodyParser = require('body-parser').json();

const authCheck = require('./middleware/auth-check');
const { newTwit, getBadTweets } = require('./utils/twitter');

router.get('/fetch', authCheck, async (req, res) => {
  let tweetArray = [];

  const params = {
    screen_name: req.user.username,
    count: 200,
    trim_user: true,
    exclude_replies: true,
    include_rts: false,
    tweet_mode: 'extended'
  };

  const client = newTwit(req.user);

  for (let i = 0; i < 16; i += 1) {
    const data = await client.getStatusesUserTimeline(params);
    tweetArray = tweetArray.concat(data);
    params.max_id = tweetArray[tweetArray.length - 1].id;
  }

  res.json({ user: req.user.username, tweets: getBadTweets(tweetArray) });
});

router.post('/delete', authCheck, bodyParser, async (req, res) => {
  const bod = {
    status: undefined,
    errorCode: undefined
  };

  const client = newTwit(req.user);

  res.set('Content-Type', 'application/json');

  try {
    await client.postStatusesDestroyById({ id: req.body.tweetid });
    bod.status = 'OK';
    res.json(bod);
  } catch (err) {
    bod.status = 'FAIL';
    bod.errorCode = err.code;
    res.json(bod);
  }
});

router.post('/retweet', authCheck, bodyParser, async (req, res) => {
  const bod = {
    status: undefined,
    errorCode: undefined
  };

  const client = newTwit(req.user);

  res.set('Content-Type', 'application/json');

  try {
    await client.postStatusesRetweetById({ id: req.body.tweetid });
    bod.status = 'OK';
    res.json(bod);
  } catch (err) {
    bod.status = 'FAIL';
    bod.errorCode = err.code;
    res.json(bod);
  }
});

module.exports = router;
