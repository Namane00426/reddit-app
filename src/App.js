import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, setSubreddit } from './features/posts/postsSlice';
import PostItem from './components/PostItem';

function App() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const subreddit = useSelector((state) => state.posts.subreddit);
  const error = useSelector((state) => state.posts.error)

  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState(() => {
    const stored = localStorage.getItem('searchHistory');
    return stored ? JSON.parse(stored) : [];
  })

  useEffect(() => {
    dispatch(fetchPosts(subreddit));
  }, [dispatch, subreddit]);

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed) {
      dispatch(setSubreddit(trimmed));

      const updatedHistory = [trimmed, ...searchHistory.filter((term) => term !== trimmed)].slice(0,5);
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
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

      <div
  style={{
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
    margin: '12px 0',
  }}
>
  <span style={{ fontWeight: 'bold' }}>🕘 Recent Searches:</span>
    {searchHistory.map((term, idx) => (
      <button
        key={idx}
        style={{
          display: 'inline-block',
          padding: '4px 8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#f9f9f9',
          fontSize: '0.9rem',
          cursor: 'pointer',
        }}
        onClick={() => {
          setSearchTerm(term);
          dispatch(setSubreddit(term));
        }}
      >
        {term}
      </button>
    ))}
</div>


      {loading ? (
        <p>🔄 Loading posts...</p>
      ) : error ? (
        <p style={{color: 'red'}}>{error}</p>
      ) : posts.length === 0 ?(
        <p>⚠️ No posts found.</p>
      ) : (
        <ul>
          {posts.map((post) => (
           <PostItem key={post.id} post={post} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
