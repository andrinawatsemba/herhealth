const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Patient: Get all their health records
router.get('/', authenticateToken, authorizeRoles('Patient'), async (req, res) => {
  try {
    const userId = req.user.id;
    const [records] = await pool.query('SELECT id, trimester, notes, created_at FROM health_records WHERE user_id = ?', [userId]);
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch records', error: err.message });
  }
});

// Patient: Add a new health record
router.post('/', authenticateToken, authorizeRoles('Patient'), async (req, res) => {
  const { trimester, notes } = req.body;
  if (!trimester || !notes) {
    return res.status(400).json({ message: 'Trimester and notes are required' });
  }
  try {
    const userId = req.user.id;
    await pool.query('INSERT INTO health_records (user_id, trimester, notes) VALUES (?, ?, ?)', [userId, trimester, notes]);
    res.status(201).json({ message: 'Health record added' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add record', error: err.message });
  }
});

// Patient: Update their own health record
router.put('/:id', authenticateToken, authorizeRoles('Patient'), async (req, res) => {
  const { id } = req.params;
  const { trimester, notes } = req.body;
  try {
    const userId = req.user.id;
    const [result] = await pool.query('UPDATE health_records SET trimester = ?, notes = ? WHERE id = ? AND user_id = ?', [trimester, notes, id, userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Record not found or not yours' });
    }
    res.json({ message: 'Health record updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update record', error: err.message });
  }
});

// Health Worker: View all health records
router.get('/all', authenticateToken, authorizeRoles('Health Worker'), async (req, res) => {
  try {
    const [records] = await pool.query('SELECT hr.id, u.username, u.email, hr.trimester, hr.notes, hr.created_at FROM health_records hr JOIN users u ON hr.user_id = u.id');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all records', error: err.message });
  }
});

module.exports = router;