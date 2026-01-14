import React, { useState, useEffect } from 'react';
import '../styles/Fridge.css';
import { mockIngredients } from '../services/mockApi';
import logo from '../assets/logo2.png';

export default function Fridge({ onBack, onSelectRecipe }) {
  const [fridge, setFridge] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [expiration, setExpiration] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadFridge();
    setIngredients(mockIngredients);
  }, []);

  const loadFridge = () => {
    const data = localStorage.getItem('fridge_items');
    setFridge(data ? JSON.parse(data) : []);
  };

  const handleAddItem = () => {
    if (!selectedIngredient || quantity <= 0) return;

    const ingredient = ingredients.find(i => i.id === parseInt(selectedIngredient));
    const newItem = {
      id: Date.now(),
      name: ingredient.name,
      quantity: parseFloat(quantity),
      unit: ingredient.unit,
      expiration: expiration,
      addedAt: new Date().toISOString()
    };

    const updatedFridge = [...fridge, newItem];
    localStorage.setItem('fridge_items', JSON.stringify(updatedFridge));
    setFridge(updatedFridge);
    
    setSelectedIngredient(null);
    setQuantity(1);
    setExpiration('');
    setSelectedItem(null);
  };

  const handleDeleteItem = (id) => {
    const updatedFridge = fridge.filter(item => item.id !== id);
    localStorage.setItem('fridge_items', JSON.stringify(updatedFridge));
    setFridge(updatedFridge);
    setSelectedItem(null);
  };

  const canRecommend = fridge.length >= 3;

  return (
    <div className="fridge-container">
      <div className="page-header">
        <button onClick={onBack} className="back-btn">← Zpět</button>
        <div className="header-logo-section">
          <img src={logo} alt="Zlatá Lednice" className="page-logo" />
          <h2>Moje Lednice</h2>
        </div>
      </div>

      <div className="fridge-content">
        <div className="add-item">
          <h3>Přidat surovinu</h3>
          <select 
            value={selectedIngredient || ''} 
            onChange={(e) => setSelectedIngredient(Number(e.target.value))}
          >
            <option value="">Vyber surovinu</option>
            {ingredients.map(ing => (
              <option key={ing.id} value={ing.id}>{ing.name} ({ing.unit})</option>
            ))}
          </select>

          <div className="input-group">
            <input 
              type="number" 
              placeholder="Množství"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="0"
            />
            <input 
              type="date"
              placeholder="Datum trvanlivosti"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              title="Datum trvanlivosti"
            />
            <button onClick={handleAddItem}>Přidat</button>
          </div>
        </div>

        <div className="fridge-items">
          <h3>Obsah lednice ({fridge.length})</h3>
          {fridge.length === 0 ? (
            <p>Lednice je prázdná</p>
          ) : (
            <div className="items-list">
              {fridge.map(item => (
                <div key={item.id} className="fridge-item">
                  <div onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)} className="item-header">
                    <span>{item.name}</span>
                    <span className="quantity">{item.quantity} {item.unit}</span>
                  </div>
                  {selectedItem === item.id && (
                    <div className="item-details">
                      <p>Trvanlivost: {item.expiration ? new Date(item.expiration).toLocaleDateString('cs-CZ') : 'Nespecifikováno'}</p>
                      <button onClick={() => handleDeleteItem(item.id)} className="delete-btn">Smazat</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {canRecommend && (
          <button onClick={() => onSelectRecipe(fridge)} className="recommend-btn">
            Doporučit recept
          </button>
        )}
      </div>
    </div>
  );
}
