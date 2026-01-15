import React, { useState, useEffect } from 'react';
import '../styles/Savings.css';
import logo from '../assets/logo2.png';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';

export default function Savings({ onBack }) {
  const { user } = useAuth();
  const [summary, setSummary] = useState({ totalSavings: 0, totalKg: 0 });
  const [items, setItems] = useState([]);

  useEffect(() => {
    const setData = (recipes) => {
      const getSavedValue = (r) => {
        if (typeof r.savedAmount === 'number') return r.savedAmount;
        if (typeof r.cost === 'number') return r.cost;
        if (Array.isArray(r.consumedIngredients)) {
          return r.consumedIngredients.reduce((sum, ing) => sum + (ing.totalCost || 0), 0);
        }
        return 0;
      };

      const totalSavings = recipes.reduce((sum, r) => sum + getSavedValue(r), 0);

      const flattened = recipes.flatMap(r => (r.consumedIngredients || []).map(ing => ({
        name: ing.name,
        quantity: ing.quantity,
        unit: ing.unit,
        totalCost: ing.totalCost || 0,
        date: r.savedAt
      })));

      const totalKg = flattened
        .filter(ing => ing.unit && ing.unit.toLowerCase() === 'g')
        .reduce((sum, ing) => sum + (parseFloat(ing.quantity) || 0), 0) / 1000;

      setSummary({
        totalSavings: totalSavings.toFixed(2),
        totalKg: totalKg.toFixed(2)
      });

      setItems(flattened.sort((a, b) => new Date(b.date) - new Date(a.date)));
    };

    const load = async () => {
      if (supabase && user?.id) {
        const { data, error } = await supabase
          .from('saved_recipes')
          .select('*')
          .eq('user_id', user.id)
          .order('saved_at', { ascending: false });

        if (!error) {
          const normalized = (data || []).map(r => ({
            name: r.name,
            savedAt: r.saved_at,
            savedAmount: r.saved_amount,
            missingCost: r.missing_cost,
            consumedIngredients: r.consumed_ingredients || []
          }));
          setData(normalized);
          return;
        }
      }

      const savedKey = user?.email ? `saved_recipes_${user.email}` : 'saved_recipes';
      const data = localStorage.getItem(savedKey);
      const recipes = data ? JSON.parse(data) : [];
      setData(recipes);
    };

    load();
  }, [user]);

  return (
    <div className="savings-container">
      <div className="page-header">
        <button onClick={onBack} className="back-btn">← Zpět</button>
        <div className="header-logo-section">
          <img src={logo} alt="Zlatá Lednice" className="page-logo" />
          <h2>Ušetřeno</h2>
        </div>
      </div>

      <div className="savings-content">
        <div className="summary-card">
          <div>
            <p className="summary-label">Celkem ušetřeno</p>
            <p className="summary-value">{summary.totalSavings} Kč</p>
          </div>
          <div className="summary-divider" />
          <div>
            <p className="summary-label">Celkem ušetřeno (kg)</p>
            <p className="summary-value">{summary.totalKg} kg</p>
          </div>
        </div>

        <div className="saved-list">
          {items.length === 0 ? (
            <p className="empty">Zatím jsi neušetřil nic</p>
          ) : (
            <ul>
              {items.map((ing, idx) => (
                <li key={`${ing.name}-${idx}`} className="saved-item">
                  <div className="saved-item-main">
                    <span className="saved-name">{ing.name}</span>
                    <span className="saved-qty">{ing.quantity} {ing.unit}</span>
                    <span className="saved-cost">{ing.totalCost.toFixed(2)} Kč</span>
                  </div>
                  <span className="saved-date">{ing.date ? new Date(ing.date).toLocaleDateString('cs-CZ') : ''}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
