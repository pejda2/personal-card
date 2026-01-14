import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';
import logo from '../assets/logo.svg';

export default function Login({ onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        setError('Invalid email or password');
        return;
      }
      
      const mockToken = 'mock_token_' + Date.now();
      login({ email: user.email, username: user.username }, mockToken);
      setError('');
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logo} alt="Zlatá Lednice" className="auth-logo" />
        <h1 className="app-title">Zlatá Lednice</h1>
        <h2>Přihlášení</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Přihlásit se</button>
        </form>
        <p>Nemáš účet? <button onClick={onSwitchToRegister} className="link-btn">Registruj se</button></p>
      </div>
    </div>
  );
}
