import React from  'react';
import styles from './PostItem.module.css';

function PostItem({post}) {
  const isValidThumbnail =
    post.thumbnail && 
    post.thumbnail !== 'self' && 
    post.thumbnail !== 'default' &&
    post.thumbnail !=='nsfw';

  return (
    <li className={styles.postItem} >
      {isValidThumbnail && (
      <img
      src={post.thumbnail}
      alt=''
      className={styles.thumbnail}/>
  )}
    <div className={styles.textContent}>
      <a
      href={`https://www.reddit.com${post.permalink}`}
      target="_blank"
      rel='noopener noreferrer'
      className={styles.linkTitle}
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