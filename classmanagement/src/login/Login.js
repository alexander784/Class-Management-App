import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import SchoolLogo from '../images/SchoolLogo.png';

const LoginForm = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
    };

    fetch('http://127.0.0.1:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/SignUp');
  };

  return (
    <div className="container">
      <div className="login-form-container">
        <form className="login-form">
          <p className="Login"> LOGIN </p>
          <label htmlFor="username">
            <b>UserName</b>
          </label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <hr />
          <button className="signup-btn" onClick={handleSignup}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
