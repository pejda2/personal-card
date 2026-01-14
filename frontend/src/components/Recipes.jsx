import React, { useState, useEffect } from 'react';
import '../styles/Recipes.css';
import { extendedRecipes, calculateRecipeCost } from '../services/extendedApi';
import { mockIngredients } from '../services/mockApi';

export default function Recipes({ fridgeItems, onBack, onCompleteRecipe }) {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    setRecipes(extendedRecipes);
    setIngredients(mockIngredients);
  }, []);

  const getRecipeStatus = (recipe) => {
    const fridgeIngredientNames = fridgeItems.map(item => item.name.toLowerCase());
    const hasAllIngredients = recipe.ingredients.every(ing => 
      fridgeIngredientNames.includes(ing.name.toLowerCase())
    );
    const hasSomeIngredients = recipe.ingredients.some(ing =>
      fridgeIngredientNames.includes(ing.name.toLowerCase())
    );

    return {
      hasAllIngredients,
      hasSomeIngredients,
      missing: recipe.ingredients.filter(ing => !fridgeIngredientNames.includes(ing.name.toLowerCase()))
    };
  };

  const getFilteredRecipes = (category) => {
    if (category === 'quick') {
      return recipes.filter(r => r.time <= 15);
    } else if (category === 'complete') {
      return recipes.filter(r => getRecipeStatus(r).hasAllIngredients);
    }
    return recipes.filter(r => r.category === category);
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
        const cost = (recipeIng.quantity * ingredient.avgPrice).toFixed(2);
        
        consumedIngredients.push({
          name: recipeIng.name,
          quantity: recipeIng.quantity,
          unit: recipeIng.unit,
          price: ingredient.avgPrice,
          totalCost: parseFloat(cost)
        });
        
        item.quantity -= recipeIng.quantity;
        if (item.quantity <= 0) {
          updatedFridge.splice(fridgeIndex, 1);
        }
      }
    });
    localStorage.setItem('fridge_items', JSON.stringify(updatedFridge));
    
    // Save recipe as completed with consumed ingredients
    const cost = calculateRecipeCost(recipe, ingredients);
    const saved = JSON.parse(localStorage.getItem('saved_recipes') || '[]');
    saved.push({ 
      name: recipe.name,
      savedAt: new Date().toISOString(),
      cost: cost,
      consumedIngredients: consumedIngredients
    });
    localStorage.setItem('saved_recipes', JSON.stringify(saved));
    
    setSelectedRecipe(null);
    onCompleteRecipe(recipe);
  };

  return (
    <div className="recipes-container">
      <button onClick={onBack} className="back-btn">← Zpět</button>
      <h2>Recepty</h2>

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
                const hasSurovinu = fridgeItems.some(item => item.name.toLowerCase() === ing.name.toLowerCase());
                return (
                  <li key={idx} className={hasSurovinu ? 'have' : 'missing'}>
                    {hasSurovinu ? '✓' : '✗'} {ing.name} - {ing.quantity} {ing.unit}
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
            <h4>Odhadovaná cena: {calculateRecipeCost(selectedRecipe, ingredients)} Kč</h4>
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
                  {getFilteredRecipes(category.key).map(recipe => (
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
                        {getRecipeStatus(recipe).hasAllIngredients ? '✓ Máš vše' : `${getRecipeStatus(recipe).missing.length} chybí`}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
