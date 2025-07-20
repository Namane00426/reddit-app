export const fetchPostsFromApi = async (subreddit, sort) => {
  const response = await fetch(`http://localhost:4000/api/posts/${subreddit}?sort=${sort}`);
  
  if (!response.ok) {
    throw new Error(`Subreddit "${subreddit}" not found`);
  }

  const data = await response.json();

  if (!data?.data?.children || data.data.children.length === 0) {
    throw new Error(`No posts found for subreddit "${subreddit}"`);
  }

  return data.data.children.map(child => child.data);
};