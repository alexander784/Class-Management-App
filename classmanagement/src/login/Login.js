import React, { useState } from 'react';
import './login.css'
import App from '../App';

const LoginForm = () => {
  // Manage email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //  handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login clicked');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signup clicked');
  };
  return (
    <div className='container'>

    <div className="login-form-container">

      <div className="logo">
        <img src="https://github.com/alexander784/Class-Management-App/blob/main/classmanagement/src/images/SchoolLogo.png?raw=true
        " alt="Logo" />
      </div>
      <form className="login-form">
       <p className='Login'> LOGIN </p>
      <label for="email"><b>email address</b></label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="email"><b>password</b></label>

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
