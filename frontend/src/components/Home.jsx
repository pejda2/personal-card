import React from 'react';
import '../styles/Home.css';

export default function Home({ onEnter }) {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>ZLATÁ LEDNICE</h1>
        <button onClick={onEnter} className="enter-btn">VSTOUPIT</button>
      </div>
    </div>
  );
}
