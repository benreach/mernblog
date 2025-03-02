import React, { useState } from 'react'
import ReactQuill from 'react-quill-new'
import  'react-quill-new/dist/quill.snow.css'
import { Navigate } from 'react-router-dom';

const modules = [['bold', 'italic'], ['link', 'image']];

function CreatePost() {
    const [title,setTitle] = useState('')
    const [summary,setSummary] = useState('')
    const [content,setContent] = useState('');
    const [files,setFiles] = useState('file');
    const [redirect,setRedirect] = useState(false)

    const createNewPost = async (event)=> {
      const data = new FormData();
      data.set('title',title);
      data.set('summary',summary);
      data.set('content',content);
      data.set('file',files[0]);
      event.preventDefault();
      console.log(files)
      const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });
      if(response.ok){
        setRedirect(true);
      }
    }

    if(redirect){
      return <Navigate to={'/'} />
    }
  return (
    <form onSubmit={createNewPost}>
        <input value={title} onChange={ev=> setTitle(ev.target.value)} type="title"  placeholder='Title'/>
        <input  value={summary} onChange={ev => setSummary(ev.target.value)} type="summary" placeholder='Summary'/>
        <input type='file' onChange={ev=>setFiles(ev.target.files)} />
        <ReactQuill value={content} modules={modules} 
                    onChange={value=> setContent(value)} placeholder='Description'/>
        <button style={{marginTop: "5px"}}>Create post</button>
    </form>
  )
}

export default CreatePost