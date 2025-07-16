import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import { fetchPosts, setSubreddit, setSort } from './features/posts/postsSlice';
import PostItem from './components/PostItem';
import styles from './App.css'
import PostModal from './components/PostModal';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const subreddit = useSelector((state) => state.posts.subreddit);
  const error = useSelector((state) => state.posts.error)
  const sort = useSelector((state) => state.posts.sort);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState(() => {
    const stored = localStorage.getItem('searchHistory');
    return stored ? JSON.parse(stored) : [];
  })
  

  useEffect(() => {
    dispatch(fetchPosts({subreddit,sort}));
  }, [dispatch, subreddit, sort]);

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

  const background = location.state?.background;

  return (
    <>
    {/* Main routing */}
    <Routes location={background || location}>
      <Route
        path="/"
        element={
              <div>
          <h1>/r/ Post list of: {subreddit} in Reddit</h1>

          <input
            value={searchTerm}
            placeholder="Input Subreddit (ex. javascript)"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}>Search</button>

          <div
          style={styles.searchBoxes}
          >
      <span style={{ fontWeight: 'bold' }}>🕘 Recent Searches: </span>
        {searchHistory.map((term, idx) => (
          <button
            key={idx}
            style={styles.recentSearch}
            onClick={() => {
              setSearchTerm(term);
              dispatch(setSubreddit(term));
            }}
          >
            {term}
          </button>
        ))}
    </div>
      <div style={{margin:'12px 0'}}>
          <label htmlFor="sort-select"
          style={{marginRight:'8px'}}>Sort by:</label>
          <select
          id='sort-select'
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
          style={styles.sortButton}>
          <option value='hot'>🔥 Hot</option>
          <option value='new'>🆕 New</option>
          <option value='top'>🏆 Top</option>  
          <option value='rising'>📈 Rising</option>
        </select>
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
          <PostItem 
          key={post.id} 
          post={post} 
          onClick={()=>
            navigate(`/post/${post.id}`,  { state: { background: location, post } })
                      }
         />
        ))}
        </ul>
      )}
      </div>
        }
      />
    </Routes>
    {/*Modal Route*/}
    <Routes>
      <Route
        path="/post/:postId"
        element={
          <PostModal
          post={location.state?.post}
          onClose={() => navigate(-1)}
          />
        }
      />
    </Routes>  
    </>
  );
}

    

export default App;
