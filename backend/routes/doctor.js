const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get all patients (for doctor to view)
router.get('/patients', authenticateToken, authorizeRoles('Doctor'), async (req, res) => {
  try {
    const [patients] = await pool.query(
      "SELECT id, username, email, contact, trimester, role, created_at FROM users WHERE role = 'Patient' ORDER BY created_at DESC"
    );
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch patients', error: err.message });
  }
});

// Get all visit records (for doctor to view)
router.get('/visits', authenticateToken, authorizeRoles('Doctor'), async (req, res) => {
  try {
    const [visits] = await pool.query(`
      SELECT vr.id, vr.patient_id, u.username as patient_name, vr.visit_date, 
             vr.visit_type, vr.notes, vr.follow_up_needed, vr.created_at
      FROM visit_records vr
      JOIN users u ON vr.patient_id = u.id
      ORDER BY vr.visit_date DESC
    `);
    res.json(visits);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch visit records', error: err.message });
  }
});

// Create new visit record (doctor can add visits)
router.post('/visits', authenticateToken, authorizeRoles('Doctor'), async (req, res) => {
  try {
    const { patient_id, visit_date, visit_type, notes, follow_up_needed } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO visit_records (patient_id, visit_date, visit_type, notes, follow_up_needed) VALUES (?, ?, ?, ?, ?)',
      [patient_id, visit_date, visit_type, notes, follow_up_needed]
    );

    const [[newVisit]] = await pool.query(`
      SELECT vr.id, vr.patient_id, u.username as patient_name, vr.visit_date, 
             vr.visit_type, vr.notes, vr.follow_up_needed, vr.created_at
      FROM visit_records vr
      JOIN users u ON vr.patient_id = u.id
      WHERE vr.id = ?
    `, [result.insertId]);

    res.status(201).json(newVisit);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create visit record', error: err.message });
  }
});

module.exports = router; 