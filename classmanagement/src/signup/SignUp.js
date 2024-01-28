import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import LoginForm from '../login/Login';

const SignupForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Successful:', { fullName, email, password });
  };
// Direct to LoginForm
  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">SignUp</h2>
      <p className='create'>First create Account</p>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account?{' '}
        <Link to="/login" className="login-link">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
