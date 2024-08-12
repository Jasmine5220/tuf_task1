import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function SignIn({ setIsAuthenticated, setIsAdmin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5000/login', { username, password })
      .then(res => {
        setIsAuthenticated(res.data.isAuthenticated);
        setIsAdmin(true);
        navigate('/');
      })
      .catch(() => {
        alert('Invalid username or password');
      });
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
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
        <button type="submit">Sign In</button>
      </form>
      <div className="links">
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        <p>Admin? <Link to="/signinasadmin">Sign in as Admin</Link></p>
      </div>
    </div>
  );
}

export default SignIn;
