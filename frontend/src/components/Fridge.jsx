import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Fridge.css';

export default function Fridge({ onBack, onSelectRecipe }) {
  const { token } = useAuth();
  const [fridge, setFridge] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [expiration, setExpiration] = useState('');
  const [cost, setCost] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadFridge();
    loadIngredients();
  }, []);

  const loadFridge = async () => {
    try {
      const response = await axios.get('/api/fridge', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFridge(response.data);
    } catch (err) {
      console.error('Error loading fridge:', err);
    }
  };

  const loadIngredients = async () => {
    try {
      const response = await axios.get('/api/ingredients');
      setIngredients(response.data);
    } catch (err) {
      console.error('Error loading ingredients:', err);
    }
  };

  const handleAddItem = async () => {
    if (!selectedIngredient || quantity <= 0) return;

    try {
      await axios.post('/api/fridge', 
        { ingredientId: selectedIngredient, quantity, expiration, costPerUnit: cost },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedIngredient(null);
      setQuantity(1);
      setExpiration('');
      setCost(0);
      loadFridge();
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`/api/fridge/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      loadFridge();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const canRecommend = fridge.length >= 3;

  return (
    <div className="fridge-container">
      <button onClick={onBack} className="back-btn">← Zpět</button>
      <h2>Moje Lednice</h2>

      <div className="fridge-content">
        <div className="add-item">
          <h3>Přidat surovinu</h3>
          <select 
            value={selectedIngredient || ''} 
            onChange={(e) => setSelectedIngredient(Number(e.target.value))}
          >
            <option value="">Vyber surovinu</option>
            {ingredients.map(ing => (
              <option key={ing.id} value={ing.id}>{ing.name}</option>
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
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
            />
            <input 
              type="number" 
              placeholder="Cena za jednotku"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              min="0"
              step="0.01"
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
                      <p>Trvanlivost: {item.expiration || 'Nespecifikováno'}</p>
                      <p>Cena za jednotku: {item.cost_per_unit} Kč</p>
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
