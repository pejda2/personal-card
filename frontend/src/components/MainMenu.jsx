import React, { useState } from 'react';
import '../styles/Main.css';
import logo from '../assets/logo.png';

export default function MainMenu({ onSelectMenu, onLogout }) {
  return (
    <div className="main-menu">
      <div className="menu-header">
        <div className="header-logo-container">
          <img src={logo} alt="Zlatá Lednice" className="menu-logo" />
          <h2>Zlatá Lednice</h2>
        </div>
        <button onClick={onLogout} className="logout-btn">Odhlásit</button>
      </div>
      <div className="menu-buttons">
        <button onClick={() => onSelectMenu('fridge')} className="menu-btn">🧊 Moje Lednice</button>
        <button onClick={() => onSelectMenu('saved')} className="menu-btn">💰 Ušetřeno</button>
        <button onClick={() => onSelectMenu('expiration')} className="menu-btn">📅 Trvanlivost</button>
      </div>
    </div>
  );
}
