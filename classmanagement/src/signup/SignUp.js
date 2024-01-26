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
};