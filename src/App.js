import React, {useEffect, useState} from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subreddit, setSubreddit] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = (sub) => {
    setLoading(true);
    fetch(`https://www.reddit.com/r/${sub}.json`)
    .then((res) => {
      if(!res.ok){
        throw new Error('Can\'t find Search Term');
      }
      return res.json();
    })
    .then((data) => {
      const postData = data.data.children.map(child => child.data);
      setPosts(postData);
    })
    .catch((error) => {
      setPosts([]);
      console.error(error.message);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
  fetchPosts(subreddit);
}, [subreddit]);

  const handleSearch = () => {
    fetchPosts(searchTerm.trim());
    setSubreddit(searchTerm.trim());
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      handleSearch();
    }
  }

  if(loading) return <h1>Now Loading...</h1>

  return (
    <div>
      
      {subreddit ? <h1> /r/ Post list of:{subreddit}</h1> : <h1>Search /r/ postlist here</h1>}
     
      <input 
      value={searchTerm}
      placeholder="Input Subreddit (ex. javascript) "
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={handleKeyDown}
      />
       <button onClick={handleSearch}>Search</button>

      {loading ? (
        <p>🔄Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>⚠️Posts not found</p>
      ) : (
         <ul>
        {posts.map((post) => (
          <li key={post.id}>
        <a
        href = {`https://www.reddit.com${post.permalink}`}
        target='_blank'
        rel='noopener noreferrer'>
          {post.title}
        </a>
      </li>
        ))}
      </ul>
      )}
     
    </div>
  )
}


export default App;
