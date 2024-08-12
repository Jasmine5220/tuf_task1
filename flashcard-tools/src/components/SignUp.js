import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function SignUp({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    axios.post('http://localhost:5000/register', { username, password })
      .then(() => {
        alert('User registered successfully');
        setIsAuthenticated(true); // Set authentication to true
        navigate('/'); // Navigate to flashcards view
      })
      .catch(() => {
        alert('Error registering user');
      });
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <div className="links">
        <p>Already have an account? <Link to="/signin">SignIn</Link></p>
        <p>Admin? <Link to="/signinasadmin">Sign In as Admin</Link></p>
      </div>
    </div>
  );
}

export default SignUp;
