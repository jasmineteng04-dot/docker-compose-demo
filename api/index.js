// api/index.js
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config()
const app = express();

app.use(express.json());
const pool = new Pool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:     parseInt(process.env.DB_PORT || '5432'),
});
 
// Initialize table on startup
pool.query(`
  CREATE TABLE IF NOT EXISTS items (
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL
  )`,
  (err) => { if (err) console.error('DB init error:', err.message); }
);
 
app.get('/health', (req, res) => res.json({ status: 'ok' }));
 
app.get('/items', async (req, res) => {
  const result = await pool.query('SELECT * FROM items ORDER BY id');
  res.json(result.rows);
});
 
app.post('/items', async (req, res) => {
  const { name } = req.body;
  const result = await pool.query(
    'INSERT INTO items(name) VALUES($1) RETURNING *', [name]
  );
  res.status(201).json(result.rows[0]);
});
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
 
module.exports = app; // needed for tests