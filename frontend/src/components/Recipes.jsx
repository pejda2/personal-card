import React, { useState, useEffect } from 'react';
import '../styles/Recipes.css';
import { extendedRecipes, calculateRecipeCost } from '../services/extendedApi';
import { mockIngredients } from '../services/mockApi';
import { geminiService } from '../services/geminiService';
import logo from '../assets/logo2.png';

export default function Recipes({ fridgeItems, onBack, onCompleteRecipe }) {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [useGeminiPricing, setUseGeminiPricing] = useState(false);
  const [geminiPrices, setGeminiPrices] = useState({});
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [currentRecipePrice, setCurrentRecipePrice] = useState(null);

  useEffect(() => {
    setRecipes(extendedRecipes);
    setIngredients(mockIngredients);
  }, []);

  useEffect(() => {
    if (selectedRecipe) {
      loadRecipePrice();
    }
  }, [selectedRecipe, useGeminiPricing]);

  const loadRecipePrice = async () => {
    if (!selectedRecipe) return;
    
    setLoadingPrice(true);
    const price = await calculateRecipeCostWithGemini(selectedRecipe);
    setCurrentRecipePrice(price);
    setLoadingPrice(false);
  };

  const getRecipeStatus = (recipe) => {
    const missingList = [];
    let hasSomeIngredients = false;

    recipe.ingredients.forEach(ing => {
      const fridgeItem = fridgeItems.find(f => f.name.toLowerCase() === ing.name.toLowerCase());
      const availableQty = fridgeItem ? fridgeItem.quantity : 0;
      if (availableQty > 0) {
        hasSomeIngredients = true;
      }
      if (availableQty < ing.quantity) {
        const missingQty = ing.quantity - availableQty;
        missingList.push({ ...ing, missingQty });
      }
    });

    const hasAllIngredients = missingList.length === 0;

    return {
      hasAllIngredients,
      hasSomeIngredients,
      missing: missingList,
      missingCount: missingList.length
    };
  };

  const getFilteredRecipes = (category) => {
    let filtered = [];
    if (category === 'quick') {
      filtered = recipes.filter(r => r.time <= 15);
    } else if (category === 'complete') {
      filtered = recipes.filter(r => getRecipeStatus(r).hasAllIngredients);
    } else {
      filtered = recipes.filter(r => r.category === category);
    }
    return filtered.sort((a, b) => {
      const statusA = getRecipeStatus(a);
      const statusB = getRecipeStatus(b);
      return statusA.missingCount - statusB.missingCount;
    });
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const categories = [
    { key: 'salty', label: 'Slané recepty' },
    { key: 'sweet', label: 'Sladké recepty' },
    { key: 'quick', label: 'Do 15 minut' },
    { key: 'complete', label: 'Máš všechny suroviny' }
  ];

  const getRandomRecipe = () => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    setSelectedRecipe(randomRecipe);
  };

  const getIngredientPrice = (name) => {
    const ingredient = ingredients.find(i => i.name.toLowerCase() === name.toLowerCase());
    return ingredient ? ingredient.avgPrice : 0;
  };

  const getFridgeQuantity = (name) => {
    const item = fridgeItems.find(i => i.name.toLowerCase() === name.toLowerCase());
    return item ? item.quantity : 0;
  };

  const computeCosts = (recipe) => {
    let missingCost = 0;
    let savedCost = 0;

    recipe.ingredients.forEach(ing => {
      const price = getIngredientPrice(ing.name);
      const availableQty = getFridgeQuantity(ing.name);

      if (availableQty > 0) {
        const usedQty = Math.min(availableQty, ing.quantity);
        savedCost += usedQty * price;
        const missingQty = ing.quantity - usedQty;
        if (missingQty > 0) {
          missingCost += missingQty * price;
        }
      } else {
        missingCost += ing.quantity * price;
      }
    });

    return {
      missingCost: missingCost.toFixed(2),
      savedCost: savedCost.toFixed(2)
    };
  };

  const fetchGeminiPriceForIngredient = async (ingredientName, unit) => {
    if (geminiPrices[ingredientName]) {
      return geminiPrices[ingredientName];
    }
    
    try {
      const price = await geminiService.estimatePrice(ingredientName, unit);
      setGeminiPrices(prev => ({ ...prev, [ingredientName]: price }));
      return price;
    } catch (error) {
      console.error(`Chyba při načítání ceny pro ${ingredientName}:`, error);
      return null;
    }
  };

  const calculateRecipeCostWithGemini = async (recipe) => {
    let total = 0;
    for (const ing of recipe.ingredients) {
      let price;
      if (useGeminiPricing) {
        price = await fetchGeminiPriceForIngredient(ing.name, ing.unit);
      }
      
      if (!price) {
        const ingredient = ingredients.find(i => i.name.toLowerCase() === ing.name.toLowerCase());
        price = ingredient ? ingredient.avgPrice : 0;
      }
      
      total += ing.quantity * price;
    }
    return total.toFixed(2);
  };

  const handleCompleteRecipe = (recipe) => {
    // Prepare consumed ingredients details
    const consumedIngredients = [];
    
    // Consume ingredients from fridge
    let updatedFridge = [...fridgeItems];
    recipe.ingredients.forEach(recipeIng => {
      const fridgeIndex = updatedFridge.findIndex(
        item => item.name.toLowerCase() === recipeIng.name.toLowerCase()
      );
      if (fridgeIndex !== -1) {
        const item = updatedFridge[fridgeIndex];
        const ingredient = ingredients.find(i => i.name.toLowerCase() === recipeIng.name.toLowerCase());
        const price = ingredient ? ingredient.avgPrice : 0;
        const usedQty = Math.min(item.quantity, recipeIng.quantity);
        const cost = (usedQty * price).toFixed(2);
        
        consumedIngredients.push({
          name: recipeIng.name,
          quantity: usedQty,
          unit: recipeIng.unit,
          price: price,
          totalCost: parseFloat(cost)
        });
        
        item.quantity -= usedQty;
        if (item.quantity <= 0) {
          updatedFridge.splice(fridgeIndex, 1);
        }
      }
    });
    localStorage.setItem('fridge_items', JSON.stringify(updatedFridge));
    
    // Save recipe as completed with consumed ingredients (savings = spotřebované z lednice)
    const savedAmount = consumedIngredients.reduce((sum, ing) => sum + ing.totalCost, 0).toFixed(2);
    const { missingCost } = computeCosts(recipe);
    const saved = JSON.parse(localStorage.getItem('saved_recipes') || '[]');
    saved.push({ 
      name: recipe.name,
      savedAt: new Date().toISOString(),
      savedAmount: parseFloat(savedAmount),
      missingCost: parseFloat(missingCost),
      consumedIngredients: consumedIngredients
    });
    localStorage.setItem('saved_recipes', JSON.stringify(saved));
    
    setSelectedRecipe(null);
    onCompleteRecipe(recipe);
  };

  return (
    <div className="recipes-container">
      <div className="page-header">
        <button onClick={onBack} className="back-btn">← Zpět</button>
        <div className="header-logo-section">
          <img src={logo} alt="Zlatá Lednice" className="page-logo" />
          <h2>Recepty</h2>
        </div>
        <label className="gemini-toggle">
          <input 
            type="checkbox" 
            checked={useGeminiPricing} 
            onChange={(e) => setUseGeminiPricing(e.target.checked)}
          />
          <span>Gemini AI ceny</span>
        </label>
      </div>

      {selectedRecipe ? (
        <div className="recipe-detail">
          <button onClick={() => setSelectedRecipe(null)} className="back-btn">← Zpět na recepty</button>
          <h3>{selectedRecipe.name}</h3>
          <div className="recipe-info">
            <p><strong>Čas přípravy:</strong> {selectedRecipe.time} minut</p>
            <p><strong>Kategorie:</strong> {selectedRecipe.category === 'salty' ? 'Slané' : 'Sladké'}</p>
            <p><strong>Orientační cena:</strong> {selectedRecipe.price} Kč</p>
          </div>

          <div className="ingredients-status">
            <h4>Suroviny ({getRecipeStatus(selectedRecipe).missing.length} chybí):</h4>
            <ul>
              {selectedRecipe.ingredients.map((ing, idx) => {
                const fridgeItem = fridgeItems.find(item => item.name.toLowerCase() === ing.name.toLowerCase());
                const hasEnough = fridgeItem && fridgeItem.quantity >= ing.quantity;
                const missingQty = fridgeItem ? Math.max(0, ing.quantity - fridgeItem.quantity) : ing.quantity;
                return (
                  <li key={idx} className={hasEnough ? 'have' : 'missing'}>
                    {hasEnough ? '✓' : '✗'} {ing.name} - {ing.quantity} {ing.unit}
                    {!hasEnough && missingQty > 0 && (
                      <span className="missing-qty"> (chybí {missingQty} {ing.unit})</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="recipe-instructions">
            <h4>Postup přípravy:</h4>
            <p>{selectedRecipe.instructions}</p>
          </div>

          <div className="recipe-cost">
            {(() => {
              const { missingCost, savedCost } = computeCosts(selectedRecipe);
              return (
                <div>
                  <h4>Zbývající cena (co chybí): {missingCost} Kč</h4>
                  <p style={{ marginTop: '4px', color: '#2c3e50', fontWeight: 600 }}>Ušetříš z lednice: {savedCost} Kč</p>
                </div>
              );
            })()}
          </div>

          <button onClick={() => handleCompleteRecipe(selectedRecipe)} className="complete-btn">Hotovo - Uložit recept</button>
        </div>
      ) : (
        <div className="recipes-menu">
          <button onClick={getRandomRecipe} className="random-recipe-btn">🎲 Náhodný recept</button>

          {categories.map(category => (
            <div key={category.key} className="category">
              <button 
                className="category-btn"
                onClick={() => toggleCategory(category.key)}
              >
                {expandedCategories[category.key] ? '▼' : '▶'} {category.label}
              </button>

              {expandedCategories[category.key] && (
                <div className="recipes-list">
                  {getFilteredRecipes(category.key).map(recipe => {
                    const status = getRecipeStatus(recipe);
                    const haveList = recipe.ingredients
                      .filter(ing => {
                        const f = fridgeItems.find(item => item.name.toLowerCase() === ing.name.toLowerCase());
                        return f && f.quantity > 0;
                      })
                      .map(ing => ing.name);
                    const haveDisplay = haveList.slice(0, 3).join(', ');
                    const haveExtra = haveList.length > 3 ? '…' : '';
                    const { savedCost } = computeCosts(recipe);

                    return (
                      <div 
                        key={recipe.id} 
                        className="recipe-item"
                        onClick={() => setSelectedRecipe(recipe)}
                      >
                        <div className="recipe-header">
                          <h4>{recipe.name}</h4>
                          <span className="time">{recipe.time} min</span>
                        </div>
                        <p className="status">
                          {status.hasAllIngredients
                            ? '✓ Máš vše'
                            : `Máš ${haveList.length} (${haveDisplay}${haveExtra}) · Chybí ${status.missingCount}`}
                        </p>
                        <p className="saved-hint">ušetříš: {savedCost} Kč</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
