import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
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
  );
};

export default SignupForm;

