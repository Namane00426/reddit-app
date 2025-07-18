import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import { fetchPosts, setSubreddit, setSort } from '../features/posts/postsSlice';
import PostItem from '../components/PostItem';
import PostModal from '../components/PostModal';

export default function MainLayout(){
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error)
  const subreddit = useSelector((state) => state.posts.subreddit);
  const sort = useSelector((state) => state.posts.sort);


  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState(() => {
    const stored = localStorage.getItem('searchHistory');
    return stored ? JSON.parse(stored) : [];
  })
  const [isGrid, setIsGrid] = useState(true);

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

  return (
    <>
    <main className='max-w-6xl mx-auto px-4 py-8'>
      <section className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Reddit Search</h1>
          <p className=' mb-4'>Find subreddit by input keyword here.</p>
            <div className="flex mb-4">
           <input
            value={searchTerm}
            placeholder="Input Subreddit (ex. javascript)"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border border-gray-300 rounded px-3 py-2 w-60"
          />
          <button 
          onClick={handleSearch}
          className='bg-accent2 text-white px-4 py-2 rounded hover:bg-accent1'>Search</button>
          </div>    
        {searchHistory.length > 0 && (
          <div className='mb-4 text-sm'>
              <span className='font-semibold mr-2'>🕘 Recent Searches: </span>
        {searchHistory.map((term, idx) => (
          <button
            key={idx}
            className='bg-sub text-white px-2 py-1 rounded mr-2 mb-1'
            onClick={() => {
              setSearchTerm(term);
              dispatch(setSubreddit(term));
            }}
          >
            {term}
          </button>
        ))}
          </div>
        )}
      </section>


      <section className='mb-4 px-3 py-1'>
        
          <label htmlFor="sort-select"
          className='mr-2 font-medium'>Sort by:</label>
          <select
          id='sort-select'
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
          className='border border-gray-300 rounded-md px-2 py-1'>
          <option value='hot'>🔥 Hot</option>
          <option value='new'>🆕 New</option>
          <option value='top'>🏆 Top</option>  
          <option value='rising'>📈 Rising</option>
        </select>
      <div className='flex justify-end mb-4 space-x-2'>
        <button className={`px-3 py-1 rounded ${isGrid ? 'bg-accent2 text-white' : 'bg-sub text-text'}`}
        onClick={()=> setIsGrid(true)}>
          Grid
        </button>
        <button className={`px-3 py-1 rounded ${!isGrid ? 'bg-accent2 text-white' : 'bg-sub text-text'}`}
        onClick={()=> setIsGrid(false)}>
          List
        </button>
      </div>
       </section>
      
      <section>
      {loading ? (
        <p>🔄 Loading posts...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : posts.length === 0 ?(
        <p>⚠️ No posts found.</p>
      ) : (
        <ul className={`gap-4 ${isGrid ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 'flex flex-col'}`}>
        {posts.map((post) => (
          <PostItem 
          key={post.id} 
          post={post} 
          isGrid={isGrid}
          onClick={()=>
            navigate(`/post/${post.id}`,  { state: { background: location, post }, 
            })
          }
         />
        ))}
        </ul>
      )}
      </section>
    </main>


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
