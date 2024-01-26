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
};