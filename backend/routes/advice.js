const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all trimester-based advice
router.get('/advice', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT trimester, content FROM advice');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch advice', error: err.message });
  }
});

// Get advice for a specific trimester
router.get('/advice/:trimester', async (req, res) => {
  const { trimester } = req.params;
  try {
    const [rows] = await pool.query('SELECT content FROM advice WHERE trimester = ?', [trimester]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No advice found for this trimester' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch advice', error: err.message });
  }
});

// Get all health tips
router.get('/tips', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT title, content FROM health_tips');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch health tips', error: err.message });
  }
});

module.exports = router; 