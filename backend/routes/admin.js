const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Dashboard statistics
router.get('/dashboard/stats', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    // Get total patients
    const [[{ totalPatients }]] = await pool.query(
      "SELECT COUNT(*) as totalPatients FROM users WHERE role = 'Patient'"
    );

    // Get total antenatal visits
    const [[{ totalAntenatalVisits }]] = await pool.query(
      "SELECT COUNT(*) as totalAntenatalVisits FROM visit_records WHERE visit_type = 'antenatal'"
    );

    // Get total postnatal visits
    const [[{ totalPostnatalVisits }]] = await pool.query(
      "SELECT COUNT(*) as totalPostnatalVisits FROM visit_records WHERE visit_type = 'postnatal'"
    );

    // Get total educational materials
    const [[{ totalEducationalMaterials }]] = await pool.query(
      "SELECT COUNT(*) as totalEducationalMaterials FROM educational_materials"
    );

    // Get total feedback messages
    const [[{ totalFeedbackMessages }]] = await pool.query(
      "SELECT COUNT(*) as totalFeedbackMessages FROM feedback_messages"
    );

    res.json({
      totalPatients,
      totalAntenatalVisits,
      totalPostnatalVisits,
      totalEducationalMaterials,
      totalFeedbackMessages,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: err.message });
  }
});

// Get all patients
router.get('/patients', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const [patients] = await pool.query(
      "SELECT id, username, email, contact, trimester, role, created_at FROM users WHERE role = 'Patient' ORDER BY created_at DESC"
    );
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch patients', error: err.message });
  }
});

// Get all visit records
router.get('/visits', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
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

// Create new visit record
router.post('/visits', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
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

// Get all educational materials
router.get('/materials', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const [materials] = await pool.query(
      'SELECT id, title, category, file_url, link_url, created_at FROM educational_materials ORDER BY created_at DESC'
    );
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch educational materials', error: err.message });
  }
});

// Create new educational material
router.post('/materials', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const { title, category, file_url, link_url } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO educational_materials (title, category, file_url, link_url) VALUES (?, ?, ?, ?)',
      [title, category, file_url, link_url]
    );

    const [[newMaterial]] = await pool.query(
      'SELECT id, title, category, file_url, link_url, created_at FROM educational_materials WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newMaterial);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create educational material', error: err.message });
  }
});

// Delete educational material
router.delete('/materials/:id', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    await pool.query('DELETE FROM educational_materials WHERE id = ?', [req.params.id]);
    res.json({ message: 'Educational material deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete educational material', error: err.message });
  }
});

// Get all feedback messages
router.get('/feedback', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const [feedback] = await pool.query(`
      SELECT fm.id, fm.patient_id, u.username as patient_name, fm.message, 
             fm.is_read, fm.created_at
      FROM feedback_messages fm
      JOIN users u ON fm.patient_id = u.id
      ORDER BY fm.created_at DESC
    `);
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch feedback messages', error: err.message });
  }
});

// Mark feedback as read
router.put('/feedback/:id/read', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    await pool.query('UPDATE feedback_messages SET is_read = true WHERE id = ?', [req.params.id]);
    res.json({ message: 'Feedback marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark feedback as read', error: err.message });
  }
});

// Analytics endpoints
router.get('/analytics/monthly-visits', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const [visits] = await pool.query(`
      SELECT 
        DATE_FORMAT(visit_date, '%Y-%m') as month,
        SUM(CASE WHEN visit_type = 'antenatal' THEN 1 ELSE 0 END) as antenatal,
        SUM(CASE WHEN visit_type = 'postnatal' THEN 1 ELSE 0 END) as postnatal
      FROM visit_records
      WHERE visit_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
      GROUP BY DATE_FORMAT(visit_date, '%Y-%m')
      ORDER BY month
    `);
    res.json(visits);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch monthly visits', error: err.message });
  }
});

router.get('/analytics/care-type-distribution', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const [distribution] = await pool.query(`
      SELECT 
        CASE 
          WHEN trimester IS NULL THEN 'Not Specified'
          ELSE trimester 
        END as type,
        COUNT(*) as count
      FROM users 
      WHERE role = 'Patient'
      GROUP BY trimester
    `);
    res.json(distribution);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch care type distribution', error: err.message });
  }
});

router.get('/analytics/material-categories', authenticateToken, authorizeRoles('Admin'), async (req, res) => {
  try {
    const [categories] = await pool.query(`
      SELECT category, COUNT(*) as count
      FROM educational_materials
      GROUP BY category
      ORDER BY count DESC
    `);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch material categories', error: err.message });
  }
});

module.exports = router; 