// src/api/index.js
const BASE_URL = https://reddit-app-9jal.onrender.com/api/posts;

export const fetchPostsFromApi = async (subreddit, sort) => {
 console.log('BASE_URL:', BASE_URL);
  const response = await fetch(`${BASE_URL}/api/posts/${subreddit}?sort=${sort}`);

   
  if (!response.ok) {
    throw new Error(`Subreddit "${subreddit}" not found`);
  }

  const data = await response.json();

  if (!data?.data?.children || data.data.children.length === 0) {
    throw new Error(`No posts found for subreddit "${subreddit}"`);
  }

  return data.data.children.map(child => child.data);
};
