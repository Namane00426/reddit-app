import React from  'react';

function PostItem({post}) {
  return (
    <li style={{marginBottom: '1rem', listStyle:'none', padding:'1rem', background:'rgba(131, 212, 170, 0.4)',borderRadius:'8px', maxWidth:'80vw'}} >
      <a
      href={`https://www.reddit.com${post.permalink}`}
      target="_blank"
      rel='noopner noreferrer'
      style={{fontWeight: 'bold', textDecolation: 'none'}}
      >
        {post.title}
      </a>
      <div style={{fontSize: '0.8rem', color: 'gray'}}>
        🧑 by {post.author} | 👍 {post.ups} upvotes
      </div>
    </li>
    
  )
}

export default PostItem;