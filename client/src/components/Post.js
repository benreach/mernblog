import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo  from 'react-timeago';

function Post({_id,title,summary,cover,createdAt,author}) {
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='post'>
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={`http://localhost:4000/${cover}`} alt="" />
          </Link>
        </div>
        <div className="texts">
          <Link className='link' to={`/post/${_id}`}>
            <h2>{title}</h2>         
           </Link>
          <p className="info">
              <Link to={`/author`} className="author" style={{textTransform:'capitalize'}}></Link>
              <time style={{fontWeight: "normal"}}>{formattedDate}</time>
              <TimeAgo style={{fontWeight: "normal"}} date={createdAt} />
          </p>
        <p>{summary}</p>
        </div>
    </div>
  )
}

export default Post