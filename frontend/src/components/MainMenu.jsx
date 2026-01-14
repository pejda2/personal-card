import React, { useState } from 'react';
import '../styles/Main.css';

export default function MainMenu({ onSelectMenu, onLogout }) {
  return (
    <div className="main-menu">
      <div className="menu-header">
        <h2>Zlatá Lednice</h2>
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
