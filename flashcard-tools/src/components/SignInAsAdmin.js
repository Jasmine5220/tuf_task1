import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function SignInAsAdmin({ setIsAuthenticated, setIsAdmin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignInAsAdmin = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5000/login', { username, password })
      .then(res => {
        if (res.data.isAdmin) {
          setIsAuthenticated(true);
          setIsAdmin(true);
          navigate('/dashboard');
        } else {
          alert('Unauthorized access');
        }
      })
      .catch(() => {
        alert('Invalid username or password');
      });
  };

  return (
    <div className="login-container">
      <h2>Sign In as Admin</h2>
      <form onSubmit={handleSignInAsAdmin}>
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
        <button type="submit">Sign In as Admin</button>
      </form>
      <div className="links">
        <p>Don't have an account? <Link to="/signup">SignUp</Link></p>
        <p>Not an admin? <Link to="/signin">SignIn</Link></p>
      </div>
    </div>
  );
}

export default SignInAsAdmin;
