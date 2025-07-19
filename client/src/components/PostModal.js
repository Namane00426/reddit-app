import React from 'react';
import './PostModal.css';
import defaultThumbnail from './assets/default-thumbnail.s.png'

function PostModal({post, onClose}) {
  console.log('Modal received post:', post);
  if(!post) return null;

  const isValidThumbnail =
    post.thumbnail && 
    post.thumbnail !== 'self' && 
    post.thumbnail !== 'default' &&
    post.thumbnail !=='nsfw';

  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div
        className='modal-content'
        data-testid="post-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/*close button*/}
        <button className="modal-close" onClick={onClose}>
         ✖
        </button>

        {/*thumbnail - upper part*/}
          <div clasName='modal-thumbnail'>
           <img
  src={isValidThumbnail ? post.thumbnail : defaultThumbnail}
  alt="Post thumbnail"
 />
          </div>
        

        {/*post info - lower part*/}
        <div className='modal-details'>
          <h2>{post.title}</h2>
          <p style={{fontSize: '0.9rem', color:'#555'}}>
            🧑 {post.author} | 👍 {post.ups} upvotes | 💬 {post.num_comments} comments
          </p>
          {post.selftext && <p className='modal-selftext'>{post.selftext}</p>}
        </div>
      </div>
    </div>
  )
}

export default PostModal;