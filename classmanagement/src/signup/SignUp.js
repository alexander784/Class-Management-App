import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css'

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {

      const response = await fetch('http://127.0.0.1:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signup Successful:', data);
        navigate('/login');
      } else {
        console.error('Error during signup:', data.error || 'An error occurred during signup');
        setError(data.error || 'An error occurred during signup');
      }
    } catch (error) {
      console.error('Error during signup:', error.message || 'An error occurred during signup');
      setError(error.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
    <div className='image-container'>
      <img src='https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2Nob29sJTIwZ2F0ZXMlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D'
        alt='school image'/>'
    </div>
    <div className="signup">
      <h2 className="signup">Sign Up</h2>
      <p className="create">First create an account</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          name="fullName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email" 
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      <p>
        Already have an account?{' '}
        <Link to="/login" className="login-link">
          Login
        </Link>
      </p>
    </div>
    </div>
  );
};

export default SignupForm;

