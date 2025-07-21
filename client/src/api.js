// client/src/api.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log("BASE_URL:", BASE_URL);

export const fetchPostsFromApi = async (subreddit, sort) => {
  
  console.log("Fetching subreddit:", subreddit, "with sort:", sort);

  const response = await fetch(`${BASE_URL}/api/posts/${subreddit}?sort=${sort}`);

   
  if (!response.ok) {
    throw new Error(`Subreddit "${subreddit}" not found`);
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(`No posts found for subreddit "${subreddit}"`);
  }

  return data;
};
