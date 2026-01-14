import React, { useState, useEffect } from 'react';
import '../styles/Savings.css';
import logo from '../assets/logo2.png';

export default function Savings({ onBack }) {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [period, setPeriod] = useState('all');
  const [statistics, setStatistics] = useState({ total_savings: 0, recipe_count: 0 });

  useEffect(() => {
    loadSavedRecipes();
    loadStatistics();
  }, [period]);

  const loadSavedRecipes = () => {
    const data = localStorage.getItem('saved_recipes');
    setSavedRecipes(data ? JSON.parse(data) : []);
  };

  const loadStatistics = () => {
    const data = localStorage.getItem('saved_recipes');
    const recipes = data ? JSON.parse(data) : [];
    const getSavedValue = (r) => {
      if (typeof r.savedAmount === 'number') return r.savedAmount;
      if (typeof r.cost === 'number') return r.cost;
      if (Array.isArray(r.consumedIngredients)) {
        return r.consumedIngredients.reduce((sum, ing) => sum + (ing.totalCost || 0), 0);
      }
      return 0;
    };
    setStatistics({
      total_savings: recipes.reduce((sum, r) => sum + getSavedValue(r), 0).toFixed(2),
      recipe_count: recipes.length
    });
  };

  const periods = [
    { key: 'week', label: 'Tento týden' },
    { key: 'month', label: 'Tento měsíc' },
    { key: 'year', label: 'Tento rok' },
    { key: 'all', label: 'Vše' }
  ];

  return (
    <div className="savings-container">
      <div className="page-header">
        <button onClick={onBack} className="back-btn">← Zpět</button>
        <div className="header-logo-section">
          <img src={logo} alt="Zlatá Lednice" className="page-logo" />
          <h2>Ušetřeno</h2>
        </div>
      </div>

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
            {savedRecipes.map((recipe, idx) => (
              <div key={idx} className="saved-recipe-item">
                <h4>{recipe.name}</h4>
                {(() => {
                  const fallback = Array.isArray(recipe.consumedIngredients)
                    ? recipe.consumedIngredients.reduce((s, i) => s + (i.totalCost || 0), 0)
                    : 0;
                  const savedValue = recipe.savedAmount ?? recipe.cost ?? fallback;
                  const displayValue = typeof savedValue === 'number' ? savedValue.toFixed(2) : savedValue;
                  return (
                    <p className="total-saved">Celkem ušetřeno: <strong>{displayValue} Kč</strong></p>
                  );
                })()}
                <div className="ingredients-consumed">
                  <p className="ingredients-title">Spotřebované suroviny:</p>
                  <ul>
                    {recipe.consumedIngredients && recipe.consumedIngredients.map((ing, ingIdx) => (
                      <li key={ingIdx} className="ingredient-row">
                        <span className="ing-name">{ing.name}</span>
                        <span className="ing-qty">{ing.quantity} {ing.unit}</span>
                        <span className="ing-price">{ing.totalCost} Kč</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="date">{new Date(recipe.savedAt).toLocaleDateString('cs-CZ')}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
