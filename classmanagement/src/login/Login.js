import React, { useState } from 'react';
import './login.css'
import App from '../App';
import SchoolLogo from '../images/SchoolLogo.png';

const LoginForm = () => {
  // Manage email and password
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  //  handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

      const formData = {
        "username":username,
        "password":password
      }

      fetch("http://127.0.0.1:5000/auth/login" 
      , {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          "Accept":'application/json'

        },
        body:JSON.stringify({"username":username,
        "password":password}),
      }).then(res =>
        res.json()).then(d => 
          console.log(d))
            

  


    
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signup clicked');
  };
  return (
    <div className='container'>

    <div className="login-form-container">

      {/* <div className="logo">
        <img src={SchoolLogo}
         alt="Logo" />
      </div> */}
      <form className="login-form">
       <p className='Login'> LOGIN </p>
      <label for="username"><b>UserName</b></label>
        <input
          type="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label for="password"><b>password</b></label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        

<button className="login-btn" onClick={handleLogin}>Login</button>
<hr></hr>
<button className="signup-btn" onClick={handleSignup}>Signup</button>



 
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
