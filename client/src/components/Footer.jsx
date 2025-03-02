import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div className='container'>
        <div  className='wrapper'>
          <h1>Myblog</h1>
          <div>
            <Link className='link'>Instagram</Link>
            <Link className='link'>Facebook</Link>
            <Link className='link'>Youtube</Link>
          </div>          
        </div>
          <ul >
            <h3>Project info</h3>
            <p>This project was built in such short amount of time which mean I couldn't implement everything very well.I focused on backend server and nodeJs in this project. It took me one week to complete this project.</p>
            <p>This project was built just for fun. I have no intend to copyright others' contents</p>
          </ul>
      </div>
      <p style={{textAlign:'center', paddingBottom:"10px"}}>All right reserved by the original content owner.</p>
    </footer>
  )
}

export default Footer