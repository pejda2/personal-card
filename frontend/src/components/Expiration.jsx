import React, { useState, useEffect } from 'react';
import '../styles/Expiration.css';

export default function Expiration({ onBack }) {
  const [fridgeItems, setFridgeItems] = useState([]);

  useEffect(() => {
    loadFridge();
  }, []);

  const loadFridge = () => {
    const data = localStorage.getItem('fridge_items');
    const items = data ? JSON.parse(data) : [];
    const sorted = items.sort((a, b) => {
      if (!a.expiration) return 1;
      if (!b.expiration) return -1;
      return new Date(a.expiration) - new Date(b.expiration);
    });
    setFridgeItems(sorted);
  };

  const isExpired = (expiration) => {
    if (!expiration) return false;
    return new Date(expiration) < new Date();
  };

  const daysUntilExpiration = (expiration) => {
    if (!expiration) return null;
    const today = new Date();
    const expireDate = new Date(expiration);
    const diff = expireDate - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="expiration-container">
      <button onClick={onBack} className="back-btn">← Zpět</button>
      <h2>Trvanlivost potravin</h2>

      <div className="expiration-list">
        {fridgeItems.length === 0 ? (
          <p>Lednice je prázdná</p>
        ) : (
          fridgeItems.map(item => {
            const expired = isExpired(item.expiration);
            const days = daysUntilExpiration(item.expiration);
            
            return (
              <div key={item.id} className={`expiration-item ${expired ? 'expired' : 'valid'}`}>
                <div className="item-name">{item.name}</div>
                <div className="item-expiration">
                  {!item.expiration ? (
                    <span>Bez data trvanlivosti</span>
                  ) : expired ? (
                    <span className="expired-text">Expirováno!</span>
                  ) : (
                    <span>{days} dní do vypršení ({item.expiration})</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
