import React from  'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function PostItem({post, isGrid}) {
  const navigate = useNavigate();
  const location = useLocation();

  const isValidThumbnail =
    post.thumbnail && 
    post.thumbnail !== 'self' && 
    post.thumbnail !== 'default' &&
    post.thumbnail !=='nsfw';
  
  const handleClick= () => {
    navigate(`/post/${post.id}`, {
      state: {background: location, post},
    });
  };

  return (
    
    <li  data-testid="post-card" 
    data-time={new Date(post.created_utc * 1000).toISOString()} 
      onClick={handleClick}
       className={`bg-base text-text rounded-xl shadow-md p-4 mb-4 hover:bg-accent2 transition duration-200 cursor-pointer ${isGrid ? " ": 'flex gap-4 items-start'}`}>
      {isValidThumbnail && (
      <img
      src={post.thumbnail}
      alt={`Thumbnail for ${post.title}`}
      className={`${isGrid ? 'w-full h-48 object-cover rounded-lg mb-2' : 'w-24 h-24 object-cover rounded-md flex-shrink-0'}`}/>
  )}
    <div className={`flex flex-col space-y-1 ${isGrid ? '' : 'flex-1'}`}>
      <a
      href={`https://www.reddit.com${post.permalink}`}
      target="_blank"
      rel='noopener noreferrer'
      className="text-3 font-semibold hover:underline"
      onClick={(e) => e.stopPropagation}
      >
        {post.title}
      </a>
      <div className="text-sm text-sub mt-1" data-testid="post-date">
        🧑 by {post.author} | 👍 {post.ups} upvotes | {' '}
  {formatDistanceToNow(new Date(post.created_utc * 1000), { addSuffix: true })}
  <time data-testid="post-date" date-time={post.date}>
  {formatDistanceToNow(new Date(post.created_utc * 1000), { addSuffix: true })}
</time>
      </div>
      </div>
    </li>
    
  )
}

export default PostItem;