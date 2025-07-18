const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Patient: Get all their reminders
router.get('/', authenticateToken, authorizeRoles('Patient'), async (req, res) => {
  try {
    const userId = req.user.id;
    const [reminders] = await pool.query('SELECT id, event_name, event_date, created_at FROM reminders WHERE user_id = ?', [userId]);
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reminders', error: err.message });
  }
});

// Patient: Add a new reminder
router.post('/', authenticateToken, authorizeRoles('Patient'), async (req, res) => {
  const { event_name, event_date } = req.body;
  if (!event_name || !event_date) {
    return res.status(400).json({ message: 'Event name and date are required' });
  }
  try {
    const userId = req.user.id;
    await pool.query('INSERT INTO reminders (user_id, event_name, event_date) VALUES (?, ?, ?)', [userId, event_name, event_date]);
    res.status(201).json({ message: 'Reminder added' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add reminder', error: err.message });
  }
});

// Patient: Update their own reminder
router.put('/:id', authenticateToken, authorizeRoles('Patient'), async (req, res) => {
  const { id } = req.params;
  const { event_name, event_date } = req.body;
  try {
    const userId = req.user.id;
    const [result] = await pool.query('UPDATE reminders SET event_name = ?, event_date = ? WHERE id = ? AND user_id = ?', [event_name, event_date, id, userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reminder not found or not yours' });
    }
    res.json({ message: 'Reminder updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update reminder', error: err.message });
  }
});

// Patient: Delete their own reminder
router.delete('/:id', authenticateToken, authorizeRoles('Patient'), async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user.id;
    const [result] = await pool.query('DELETE FROM reminders WHERE id = ? AND user_id = ?', [id, userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reminder not found or not yours' });
    }
    res.json({ message: 'Reminder deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete reminder', error: err.message });
  }
});

// Health Worker: View all reminders
router.get('/all', authenticateToken, authorizeRoles('Health Worker'), async (req, res) => {
  try {
    const [reminders] = await pool.query('SELECT r.id, u.username, u.email, r.event_name, r.event_date, r.created_at FROM reminders r JOIN users u ON r.user_id = u.id');
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch all reminders', error: err.message });
  }
});

module.exports = router;