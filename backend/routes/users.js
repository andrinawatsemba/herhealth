const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const [[user]] = await pool.query(
      'SELECT id, username, email, role, trimester FROM users WHERE id = ?',
      [userId]
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user profile', error: err.message });
  }
});

// Patient dashboard: profile, trimester, health records, reminders
router.get('/dashboard', authenticateToken, authorizeRoles('Patient'), async (req, res) => {
  try {
    const userId = req.user.id;
    // Get user profile
    const [[profile]] = await pool.query('SELECT id, username, email, role, trimester FROM users WHERE id = ?', [userId]);
    // Get health records
    const [records] = await pool.query('SELECT id, trimester, notes, created_at FROM health_records WHERE user_id = ?', [userId]);
    // Get reminders
    const [reminders] = await pool.query('SELECT id, event_name, event_date, created_at FROM reminders WHERE user_id = ?', [userId]);
    res.json({ profile, records, reminders });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dashboard data', error: err.message });
  }
});

// Health Worker dashboard: list of all patients and their trimesters
router.get('/dashboard/healthworker', authenticateToken, authorizeRoles('Health Worker'), async (req, res) => {
  try {
    const [patients] = await pool.query("SELECT id, username, email, trimester FROM users WHERE role = 'Patient'");
    res.json({ patients });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch patients', error: err.message });
  }
});

module.exports = router;