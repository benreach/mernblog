import React, { useState } from 'react'

function RegisterPage() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const handleRegister =async (event) => {
    event.preventDefault();
  
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {"Content-Type": "application/json"}, 
    });

    if(response.status === 200){
      alert('register sucessful');
    }else {
      alert('Acount already existed')
    }
  }
  return (
    <form className='register' onSubmit={handleRegister}>
        <h1>Register</h1>
        <input value={username} 
                onChange={ev => setUsername(ev.target.value)} 
                type="text" placeholder='username'/>
        <input value={password} 
                onChange={ev => setPassword(ev.target.value)} 
                type="password" placeholder='password'/>
        <button>Register</button>
    </form>    
  )
}

export default RegisterPage