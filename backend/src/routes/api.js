import express from 'express';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { recipes, ingredients } from '../models/recipes.js';

const router = express.Router();

// Get all recipes
router.get('/recipes', (req, res) => {
  res.json(recipes);
});

// Get random recipe
router.get('/recipes/random', (req, res) => {
  const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
  res.json(randomRecipe);
});

// Get all ingredients
router.get('/ingredients', (req, res) => {
  res.json(ingredients);
});

// Add item to user's fridge
router.post('/fridge', authenticateToken, async (req, res) => {
  const { ingredientId, quantity, expiration, costPerUnit } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO fridge_items (user_id, ingredient_id, quantity, expiration, cost_per_unit) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, ingredientId, quantity, expiration, costPerUnit]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's fridge
router.get('/fridge', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT fi.*, i.name, i.unit FROM fridge_items fi JOIN ingredients i ON fi.ingredient_id = i.id WHERE fi.user_id = $1 ORDER BY fi.expiration ASC',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update fridge item
router.put('/fridge/:id', authenticateToken, async (req, res) => {
  const { quantity, expiration, costPerUnit } = req.body;
  const itemId = req.params.id;

  try {
    const result = await pool.query(
      'UPDATE fridge_items SET quantity = $1, expiration = $2, cost_per_unit = $3 WHERE id = $4 RETURNING *',
      [quantity, expiration, costPerUnit, itemId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete fridge item
router.delete('/fridge/:id', authenticateToken, async (req, res) => {
  const itemId = req.params.id;

  try {
    await pool.query('DELETE FROM fridge_items WHERE id = $1', [itemId]);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add saved recipe
router.post('/saved-recipes', authenticateToken, async (req, res) => {
  const { recipeId, savedDate } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO saved_recipes (user_id, recipe_id, saved_date) VALUES ($1, $2, $3) RETURNING *',
      [userId, recipeId, savedDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get saved recipes
router.get('/saved-recipes', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM saved_recipes WHERE user_id = $1 ORDER BY saved_date DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get savings statistics
router.get('/savings', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { period } = req.query; // 'week', 'month', 'year', 'all'

  try {
    let dateFilter = '';
    if (period === 'week') {
      dateFilter = "AND saved_date >= CURRENT_DATE - INTERVAL '7 days'";
    } else if (period === 'month') {
      dateFilter = "AND saved_date >= CURRENT_DATE - INTERVAL '30 days'";
    } else if (period === 'year') {
      dateFilter = "AND saved_date >= CURRENT_DATE - INTERVAL '365 days'";
    }

    const result = await pool.query(
      `SELECT COALESCE(SUM(total_cost), 0) as total_savings, COUNT(*) as recipe_count
       FROM saved_recipes WHERE user_id = $1 ${dateFilter}`,
      [userId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
