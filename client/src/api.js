// client/src/api.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchPostsFromApi = async (subreddit, sort) => {
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
