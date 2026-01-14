import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/database.js';
import authRoutes from './routes/auth.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Initialize database
const initDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS ingredients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        unit VARCHAR(50) NOT NULL,
        avg_price DECIMAL(10, 2)
      );

      CREATE TABLE IF NOT EXISTS fridge_items (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        ingredient_id INT REFERENCES ingredients(id),
        quantity DECIMAL(10, 2) NOT NULL,
        expiration DATE,
        cost_per_unit DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS recipes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        time INT,
        category VARCHAR(50),
        price DECIMAL(10, 2)
      );

      CREATE TABLE IF NOT EXISTS recipe_ingredients (
        id SERIAL PRIMARY KEY,
        recipe_id INT REFERENCES recipes(id),
        ingredient_id INT REFERENCES ingredients(id),
        quantity DECIMAL(10, 2),
        unit VARCHAR(50)
      );

      CREATE TABLE IF NOT EXISTS saved_recipes (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        recipe_id INT REFERENCES recipes(id),
        saved_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        total_cost DECIMAL(10, 2)
      );
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

// Start server
app.listen(PORT, async () => {
  await initDatabase();
  console.log(`Server running on port ${PORT}`);
});

export default app;
