//server/index.js
const axios = require('axios');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');


const app = express();
app.use(cors());

const USER_AGENT = 'RedditClientApp/0.1 by OstrichSea5657';

//app.get('/', (req, res) => {
  //res.send('🟢 Reddit API server is running.');
//});


app.get('/api/posts/:subreddit', async (req, res) => {
  const { subreddit } = req.params;
  const sort = req.query.sort || 'hot';

  const auth = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64');

  try {
    
    const tokenResponse = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': USER_AGENT,
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    
    const redditResponse = await axios.get(
      `https://oauth.reddit.com/r/${subreddit}/${sort}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'User-Agent': USER_AGENT,
        },
      }
    );

    res.json(redditResponse.data.data.children.map((child) => child.data));
  } catch (error) {
    console.error('Error fetching posts', error.message);
    res.status(500).json({ error: 'Failed to fetch posts from Reddit API' });
  }
});


// React のビルド済みファイルを配信
app.use(express.static(path.join(__dirname, '../client/build')));

// フロントエンドのすべてのルーティングを React に委譲
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});


