import React from 'react';
import '../styles/Home.css';
import logo from '../assets/logo.png';

export default function Home({ onEnter }) {
  return (
    <div className="home-container">
      <div className="home-content">
        <img src={logo} alt="Zlatá Lednice" className="home-logo" />
        <h1>ZLATÁ LEDNICE</h1>
        <p className="home-subtitle">Tvůj chytrý asistent pro správu lednice</p>
        <button onClick={onEnter} className="enter-btn">VSTOUPIT</button>
      </div>
    </div>
  );
}
