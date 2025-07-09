import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, setSubreddit } from './features/posts/postsSlice';

function App() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const subreddit = useSelector((state) => state.posts.subreddit);
  const error = useSelector((state) => state.posts.error)

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchPosts(subreddit));
  }, [dispatch, subreddit]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(setSubreddit(searchTerm.trim()));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <h1>/r/ Post list of: {subreddit}</h1>

      <input
        value={searchTerm}
        placeholder="Input Subreddit (ex. javascript)"
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
 {error && <p style={{ color: 'red' }}>{error}</p>}
{!loading && posts.length === 0 && !error && <p>No posts found.</p>}
      {loading ? (
        <p>🔄 Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>⚠️ Posts not found</p>
      ) : (
        
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <a
                href={`https://www.reddit.com${post.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.title}
              
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
