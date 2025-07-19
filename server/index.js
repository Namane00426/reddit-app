const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const USER_AGENT = 'RedditClientApp/0.1 by OstrichSea5657';

let cachedToken = null;
let tokenExpiresAt = 0;

// Reddit OAuth2: Get accesstoken
async function getAccessToken() {
  const now = Date.now();
  if(cachedToken && now < tokenExpiresAt) {
    return cachedToken;
  }

  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const response = await axios.post(
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

  cachedToken = response.data.access_token;
  tokenExpiresAt = now + response.data.expires_in * 1000 -5000;
  return cachedToken;
}

// proxy endpoint: get Subreddit posts
app.get('/api/posts/:subreddit', async (req, res) => {
  const {subreddit} = req.params;
  const sort = req.query.sort || 'hot';

  try{
    const token = await getAccessToken();
    const response = await axios.get(
      `https://oauth.reddit.com/r/${subreddit}/${sort}.json`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': USER_AGENT,
        },
      }
    );

    res.json(response.data);
  }catch (error) {
    console.error('Error fetching posts', error.message);
    res.status(500).json({error: 'Failed to fetch posts from Reddit API'});
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});

//command server>node index.js