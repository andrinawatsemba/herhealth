-- Additional tables for Admin Dashboard functionality

-- Visit Records table
CREATE TABLE IF NOT EXISTS visit_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  visit_date DATE NOT NULL,
  visit_type ENUM('antenatal', 'postnatal') NOT NULL,
  notes TEXT,
  follow_up_needed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Educational Materials table
CREATE TABLE IF NOT EXISTS educational_materials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category ENUM('Antenatal', 'Postnatal', 'Mental Health', 'Nutrition', 'Exercise', 'Other') NOT NULL,
  file_url VARCHAR(500),
  link_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedback Messages table
CREATE TABLE IF NOT EXISTS feedback_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample data for testing
INSERT INTO visit_records (patient_id, visit_date, visit_type, notes, follow_up_needed) VALUES
(1, '2024-01-15', 'antenatal', 'First trimester checkup. Patient is doing well.', FALSE),
(1, '2024-02-15', 'antenatal', 'Second trimester checkup. All vitals normal.', FALSE),
(2, '2024-01-20', 'antenatal', 'First visit. Patient has some concerns about nutrition.', TRUE),
(2, '2024-03-10', 'postnatal', 'Post-delivery checkup. Mother and baby healthy.', FALSE);

INSERT INTO educational_materials (title, category, link_url) VALUES
('Pregnancy Nutrition Guide', 'Nutrition', 'https://example.com/nutrition-guide'),
('Mental Health During Pregnancy', 'Mental Health', 'https://example.com/mental-health'),
('Exercise Guidelines for Pregnant Women', 'Exercise', 'https://example.com/exercise-guide'),
('Antenatal Care Checklist', 'Antenatal', 'https://example.com/antenatal-checklist'),
('Postnatal Recovery Tips', 'Postnatal', 'https://example.com/postnatal-tips');

INSERT INTO feedback_messages (patient_id, message) VALUES
(1, 'I have a question about my next appointment schedule.'),
(2, 'The educational materials were very helpful, thank you!'),
(1, 'I would like to know more about breastfeeding techniques.'),
(2, 'Can you provide more information about postpartum depression?'); 