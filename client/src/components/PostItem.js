import React from  'react';
import styles from './PostItem.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

function PostItem({post}) {
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
    <li 
      onClick={handleClick}
      className={styles.postItem} >
      {isValidThumbnail && (
      <img
      src={post.thumbnail}
      alt={`Thumbnail for ${post.title}`}
      className={styles.thumbnail}/>
  )}
    <div className={styles.textContent}>
      <a
      href={`https://www.reddit.com${post.permalink}`}
      target="_blank"
      rel='noopener noreferrer'
      className={styles.linkTitle}
      onClick={(e) => e.stopPropagation}
      >
        {post.title}
      </a>
      <div className={styles.meta}>
        🧑 by {post.author} | 👍 {post.ups} upvotes
      </div>
      </div>
    </li>
    
  )
}

export default PostItem;