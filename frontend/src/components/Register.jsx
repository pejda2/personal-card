import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';
import logo from '../assets/logo.png';

export default function Register({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.find(u => u.email === email)) {
        setError('Email already registered');
        return;
      }
      
      const newUser = { email, username, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      const mockToken = 'mock_token_' + Date.now();
      login({ email, username }, mockToken);
      setError('');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="Zlatá Lednice" className="auth-logo" />
        <h1 className="app-title">Zlatá Lednice</h1>
        <h2>Registrace</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Uživatelské jméno"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Registrovat se</button>
        </form>
        <p>Už máš účet? <button onClick={onSwitchToLogin} className="link-btn">Přihláš se</button></p>
      </div>
    </div>
  );
}
