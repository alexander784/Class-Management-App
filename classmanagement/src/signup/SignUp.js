import React, { useState } from 'react';
import './signup.css';

const SignupForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Signup Successful:', { fullName, email, password });
  };

  const redirectToLogin = () => {
    console.log('Redirecting to Login page');
  };
  return (
    <div className="signup-container">
      <h2 className="signup-title">SignUp</h2>
      <p className='create'>First create Account</p>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input type="text" placeholder='Full Name'name="fullName"value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input type="text" placeholder='Email'name="email"value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input type="password"
          placeholder='Password'
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder='Confirm password'
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account?{' '}
        <button className="login-link" onClick={redirectToLogin}>
          Login
        </button>
      </p>
    </div>
  );
};

export default SignupForm;