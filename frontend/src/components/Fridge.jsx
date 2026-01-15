import React, { useState, useEffect, useMemo } from 'react';
import '../styles/Fridge.css';
import { mockIngredients } from '../services/mockApi';
import { extendedRecipes } from '../services/extendedApi';
import logo from '../assets/logo2.png';
import { useAuth } from '../context/AuthContext';

const INGREDIENT_CATEGORIES = {
  'Maso a uzeniny': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  'Ryby': [13, 14],
  'Mléčné výrobky': [15, 16, 17, 18, 19, 20, 21, 22, 23],
  'Zelenina': [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
  'Ovoce': [39, 40, 41, 42, 43],
  'Koloniál a ostatní': [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55]
};

export default function Fridge({ onBack, onSelectRecipe }) {
  const { user } = useAuth();
  const [fridge, setFridge] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [ingredientInputs, setIngredientInputs] = useState({});
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [topExpanded, setTopExpanded] = useState(false);
  const [editQuantities, setEditQuantities] = useState({});

  useEffect(() => {
    loadFridge();
    setIngredients(mockIngredients);
    setTopExpanded(false);
    const collapsed = Object.keys(INGREDIENT_CATEGORIES).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    setExpandedCategories(collapsed);
  }, [user]);

  const fridgeKey = user?.email ? `fridge_items_${user.email}` : 'fridge_items';

  const loadFridge = () => {
    const data = localStorage.getItem(fridgeKey);
    const items = data ? JSON.parse(data) : [];
    setFridge(items);
    setEditQuantities({});
  };

  const handleAddItem = (ingredientId, quantity, expiration) => {
    if (quantity <= 0) return;

    const ingredient = ingredients.find(i => i.id === ingredientId);
    if (!ingredient) return;

    const newItem = {
      id: Date.now(),
      name: ingredient.name,
      quantity: parseFloat(quantity),
      unit: ingredient.unit,
      expiration: expiration,
      addedAt: new Date().toISOString()
    };

    const updatedFridge = [...fridge, newItem];
    localStorage.setItem(fridgeKey, JSON.stringify(updatedFridge));
    setFridge(updatedFridge);
    
    setIngredientInputs(prev => ({
      ...prev,
      [ingredientId]: { quantity: '', expiration: '' }
    }));
  };

  const handleDeleteItem = (id) => {
    const updatedFridge = fridge.filter(item => item.id !== id);
    localStorage.setItem(fridgeKey, JSON.stringify(updatedFridge));
    setFridge(updatedFridge);
  };

  const handleUpdateItemQuantity = (id) => {
    const raw = editQuantities[id];
    const newQty = parseFloat(raw);
    if (!Number.isFinite(newQty) || newQty <= 0) return;

    const updatedFridge = fridge.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    localStorage.setItem(fridgeKey, JSON.stringify(updatedFridge));
    setFridge(updatedFridge);
    setEditQuantities(prev => ({
      ...prev,
      [id]: ''
    }));
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleIngredient = (ingredientId) => {
    setSelectedIngredients(prev => ({
      ...prev,
      [ingredientId]: !prev[ingredientId]
    }));
  };

  const getIngredientsByCategory = (category) => {
    const ids = INGREDIENT_CATEGORIES[category];
    return ingredients
      .filter(ing => ids.includes(ing.id))
      .sort((a, b) => a.name.localeCompare(b.name, 'cs'));
  };

  const isFridgeContainsIngredient = (ingredientName) => {
    return fridge.some(item => item.name.toLowerCase() === ingredientName.toLowerCase());
  };

  const canRecommend = fridge.length >= 3;
  const recommendDisabled = !canRecommend;

  const topIngredients = useMemo(() => {
    const counts = {};
    extendedRecipes.forEach(r => {
      r.ingredients.forEach(ing => {
        counts[ing.name] = (counts[ing.name] || 0) + 1;
      });
    });
    const list = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name]) => ingredients.find(i => i.name.toLowerCase() === name.toLowerCase()))
      .filter(Boolean);
    return list;
  }, [ingredients]);

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
        <div className="recommend-bar">
          <button
            onClick={() => onSelectRecipe(fridge)}
            className="recommend-btn"
            disabled={recommendDisabled}
          >
            🎲 Doporučit recept
          </button>
          <span className="recommend-hint">Zadejte prosím alespoň 3 suroviny.</span>
        </div>

        <div className="add-ingredients-section">
          <h3>Přidat suroviny</h3>
          {topIngredients.length > 0 && (
            <div className="category-card top-card">
              <button
                type="button"
                className="category-header top-header"
                onClick={() => setTopExpanded(v => !v)}
                aria-expanded={topExpanded}
              >
                {topExpanded ? '▼' : '▶'} Nejčastěji v receptech
              </button>
              {topExpanded && (
                <div className="category-items">
                  {topIngredients.map(ing => {
                    const input = ingredientInputs[ing.id] || { quantity: '', expiration: '' };
                    const isSelected = selectedIngredients[ing.id] || false;
                    const hasItem = isFridgeContainsIngredient(ing.name);
                    return (
                      <div key={`top-${ing.id}`} className="ingredient-row">
                        <div className="ingredient-row-header">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              toggleIngredient(ing.id);
                              if (!e.target.checked) {
                                setIngredientInputs(prev => ({
                                  ...prev,
                                  [ing.id]: { quantity: '', expiration: '' }
                                }));
                              }
                            }}
                            className="ingredient-checkbox"
                          />
                          <span className="ingredient-name">{ing.name}</span>
                        </div>

                        {isSelected && (
                          <div className="ingredient-inputs">
                            <div className="input-wrapper">
                              <label className="date-label">Množství:</label>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <input
                                  type="number"
                                  placeholder="0"
                                  value={input.quantity}
                                  onChange={(e) => setIngredientInputs(prev => ({
                                    ...prev,
                                    [ing.id]: { ...input, quantity: e.target.value }
                                  }))}
                                  className="ingredient-qty"
                                  min="0"
                                  step="any"
                                  style={{ flex: 1 }}
                                />
                                <span className="unit-label" style={{ marginTop: 0, fontSize: '0.95rem', fontWeight: 600 }}>{ing.unit}</span>
                              </div>
                            </div>

                            <div className="input-wrapper">
                              <label className="date-label">Datum expirace:</label>
                              <input
                                type="date"
                                value={input.expiration}
                                onChange={(e) => setIngredientInputs(prev => ({
                                  ...prev,
                                  [ing.id]: { ...input, expiration: e.target.value }
                                }))}
                                className="ingredient-date"
                              />
                            </div>

                            <button
                              onClick={() => handleAddItem(ing.id, parseFloat(input.quantity) || 0, input.expiration)}
                              className="ingredient-add-btn"
                              disabled={!input.quantity || parseFloat(input.quantity) <= 0}
                            >
                              + Přidat
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          <div className="categories-grid">
            {Object.keys(INGREDIENT_CATEGORIES).map(category => (
              <div key={category} className="category-card">
                <button 
                  className="category-header"
                  onClick={() => toggleCategory(category)}
                >
                  {expandedCategories[category] ? '▼' : '▶'} {category}
                </button>

                {expandedCategories[category] && (
                  <div className="category-items">
                    {getIngredientsByCategory(category).map(ing => {
                      const input = ingredientInputs[ing.id] || { quantity: '', expiration: '' };
                      const isSelected = selectedIngredients[ing.id] || false;
                      const hasItem = isFridgeContainsIngredient(ing.name);
                      return (
                        <div key={ing.id} className="ingredient-row">
                          <div className="ingredient-row-header">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                toggleIngredient(ing.id);
                                if (!e.target.checked) {
                                  setIngredientInputs(prev => ({
                                    ...prev,
                                    [ing.id]: { quantity: '', expiration: '' }
                                  }));
                                }
                              }}
                              className="ingredient-checkbox"
                            />
                            <span className="ingredient-name">{ing.name}</span>
                          </div>

                          {isSelected && (
                            <div className="ingredient-inputs">
                              <div className="input-wrapper">
                                <label className="date-label">Množství:</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <input
                                    type="number"
                                    placeholder="0"
                                    value={input.quantity}
                                    onChange={(e) => setIngredientInputs(prev => ({
                                      ...prev,
                                      [ing.id]: { ...input, quantity: e.target.value }
                                    }))}
                                    className="ingredient-qty"
                                    min="0"
                                    step="any"
                                    style={{ flex: 1 }}
                                  />
                                  <span className="unit-label" style={{ marginTop: 0, fontSize: '0.95rem', fontWeight: 600 }}>{ing.unit}</span>
                                </div>
                              </div>

                              <div className="input-wrapper">
                                <label className="date-label">Datum expirace:</label>
                                <input
                                  type="date"
                                  value={input.expiration}
                                  onChange={(e) => setIngredientInputs(prev => ({
                                    ...prev,
                                    [ing.id]: { ...input, expiration: e.target.value }
                                  }))}
                                  className="ingredient-date"
                                />
                              </div>

                              <button
                                onClick={() => handleAddItem(ing.id, parseFloat(input.quantity) || 0, input.expiration)}
                                className="ingredient-add-btn"
                                disabled={!input.quantity || parseFloat(input.quantity) <= 0}
                              >
                                + Přidat
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
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
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <div className="item-qty-edit">
                      <span className="item-qty-display">{item.quantity} {item.unit}</span>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        className="item-qty-input"
                        value={editQuantities[item.id] ?? ''}
                        placeholder="Změnit množství"
                        onChange={(e) => setEditQuantities(prev => ({
                          ...prev,
                          [item.id]: e.target.value
                        }))}
                      />
                      <button
                        onClick={() => handleUpdateItemQuantity(item.id)}
                        className="save-btn"
                      >
                        Uložit
                      </button>
                    </div>
                    {item.expiration && (
                      <span className="item-date">
                        Exp: {new Date(item.expiration).toLocaleDateString('cs-CZ')}
                      </span>
                    )}
                  </div>
                  <button onClick={() => handleDeleteItem(item.id)} className="delete-btn">🗑</button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
