import React, {useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import    TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';


function PostPage() {
    const [postInfo,setPostInfo] = useState(null);
    const {userInfo} = useContext(UserContext);

    const {id} = useParams();
    useEffect(()=> {
        fetch(`http://localhost:4000/post/${id}`)
        .then(res => {
            res.json().then(postInfo => {
                setPostInfo(postInfo);
            });
        });
    },[]);

    if(!postInfo) return '';

    const formattedDate = new Date(postInfo.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

    
  return (
    <div className='post-page'>
        <h1>{postInfo.title}</h1>
        <div className='image'>
            <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />      
        </div>
        <div className="info">
                <time dateTime="">{formattedDate} </time>
                <TimeAgo date={postInfo.createdAt}/>
        </div> 
        
        <h2>{postInfo.summary}</h2>
        <div dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        
    </div>
  )
}

export default PostPage
