import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import SchoolLogo from '../images/SchoolLogo.png';
import { useUser } from '../UserContext';

const LoginForm = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useUser();
  
  const { currentUser, setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('http://127.0.0.1:5555/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
  
        const fetchUser = async () => {
          try {
            const userResponse = await fetch(`http://127.0.0.1:5555/users/${formData.username}`);
  
            if (!userResponse.ok) {
              throw new Error(`Failed to fetch user: ${userResponse.status} ${userResponse.statusText}`);
            }
  
            const userData = await userResponse.json();
            loginUser(userData);
            // setUser(userData);
            console.log(userData); // Log the fetched user data
            navigate('/Dashboard');
          } catch (error) {
            console.error('Error fetching user:', error);
          }
        };
  
        fetchUser();
        // Store the tokens
        const token = data.token;

        // Navigate to the Dashboard after successful login
        
              
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // handleSignup

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
