import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

export default function Register({ onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/register', { email, username, password });
      login(response.data.user, response.data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div>
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
