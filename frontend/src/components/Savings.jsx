import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Savings.css';

export default function Savings({ onBack }) {
  const { token } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [period, setPeriod] = useState('all');
  const [statistics, setStatistics] = useState({ total_savings: 0, recipe_count: 0 });

  useEffect(() => {
    loadSavedRecipes();
    loadStatistics();
  }, [period]);

  const loadSavedRecipes = async () => {
    try {
      const response = await axios.get('/api/saved-recipes', {
        headers: { Authorization: `Bearer ${token}` },
        params: { period }
      });
      setSavedRecipes(response.data);
    } catch (err) {
      console.error('Error loading saved recipes:', err);
    }
  };

  const loadStatistics = async () => {
    try {
      const response = await axios.get('/api/savings', {
        headers: { Authorization: `Bearer ${token}` },
        params: { period }
      });
      setStatistics(response.data);
    } catch (err) {
      console.error('Error loading statistics:', err);
    }
  };

  const periods = [
    { key: 'week', label: 'Tento týden' },
    { key: 'month', label: 'Tento měsíc' },
    { key: 'year', label: 'Tento rok' },
    { key: 'all', label: 'Vše' }
  ];

  return (
    <div className="savings-container">
      <button onClick={onBack} className="back-btn">← Zpět</button>
      <h2>Ušetřeno</h2>

      <div className="statistics">
        <div className="stat-box">
          <h3>Celkem ušetřeno</h3>
          <p className="stat-value">{statistics.total_savings} Kč</p>
        </div>
        <div className="stat-box">
          <h3>Receptů</h3>
          <p className="stat-value">{statistics.recipe_count}</p>
        </div>
      </div>

      <div className="period-selector">
        {periods.map(p => (
          <button
            key={p.key}
            className={`period-btn ${period === p.key ? 'active' : ''}`}
            onClick={() => setPeriod(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="saved-recipes">
        {savedRecipes.length === 0 ? (
          <p>Zatím jsi neušetřil nic</p>
        ) : (
          <div className="recipes-list">
            {savedRecipes.map(recipe => (
              <div key={recipe.id} className="saved-recipe-item">
                <h4>{recipe.recipe_id}</h4>
                <p>Ušetřeno: {recipe.total_cost} Kč</p>
                <p className="date">{new Date(recipe.saved_date).toLocaleDateString('cs-CZ')}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
