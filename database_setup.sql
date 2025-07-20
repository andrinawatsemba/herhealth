-- Complete Database Setup for Her Health App
-- This includes all tables needed for Admin and Doctor Dashboards

-- Drop and recreate database for clean setup
DROP DATABASE IF EXISTS her_health;
CREATE DATABASE her_health;
USE her_health;

-- Users table (original)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('Patient', 'Health Worker', 'Doctor', 'Admin') NOT NULL,
  contact VARCHAR(20),
  trimester ENUM('Pre-trimester', '1st', '2nd', '3rd'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Health Records table (original)
CREATE TABLE health_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  trimester ENUM('1st', '2nd', '3rd'),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Reminders table (original)
CREATE TABLE reminders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  event_name VARCHAR(100) NOT NULL,
  event_date DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Advice table (original)
CREATE TABLE advice (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trimester ENUM('Pre-trimester', '1st', '2nd', '3rd') NOT NULL,
  content TEXT NOT NULL
);

-- Health Tips table (original)
CREATE TABLE health_tips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL
);

-- NEW TABLES FOR ADMIN AND DOCTOR DASHBOARDS

-- Visit Records table (for doctor dashboard)
CREATE TABLE visit_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  visit_date DATE NOT NULL,
  visit_type ENUM('antenatal', 'postnatal') NOT NULL,
  notes TEXT,
  follow_up_needed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Educational Materials table (for admin dashboard)
CREATE TABLE educational_materials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category ENUM('Antenatal', 'Postnatal', 'Mental Health', 'Nutrition', 'Exercise', 'Other') NOT NULL,
  file_url VARCHAR(500),
  link_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedback Messages table (for admin dashboard)
CREATE TABLE feedback_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert static advice (original data)
INSERT INTO advice (trimester, content) VALUES
('Pre-trimester', 'Start prenatal vitamins, avoid alcohol/smoking, maintain healthy weight.'),
('1st', 'Take folic acid, stay hydrated, eat small meals, rest.'),
('2nd', 'Moderate exercise, monitor baby movements, attend antenatal visits.'),
('3rd', 'Prepare for delivery, birth plan, look out for labor signs.');

-- Insert static health tips (original data)
INSERT INTO health_tips (title, content) VALUES
('Nutrition during pregnancy', 'Eat iron-rich foods like beans and greens.'),
('Importance of hydration', 'Drink 8–10 glasses of water daily.'),
('Antenatal visits', 'Go for at least 4 before delivery.'),
('Warning signs', 'Bleeding, severe headaches, strong abdominal pain.');

-- Insert sample users (including admin and doctor)
INSERT INTO users (username, email, password, role, contact, trimester) VALUES
('admin', 'admin@herhealth.com', '$2b$10$samplehashforadmin', 'Admin', '+1234567890', NULL),
('doctor1', 'doctor@herhealth.com', '$2b$10$samplehashfordoctor', 'Doctor', '+1234567891', NULL),
('Hida', 'hidaya@gmail.com', '$2b$10$samplehashforhida', 'Patient', '+1234567892', '2nd'),
('Cath', 'cathy@gmail.com', '$2b$10$samplehashforcath', 'Patient', '+1234567893', '1st'),
('Nurse123', 'nurse@clinic.com', '$2b$10$samplehashfornurse', 'Health Worker', '+1234567894', NULL),
('Sarah', 'sarah@gmail.com', '$2b$10$samplehashforsarah', 'Patient', '+1234567895', '3rd'),
('Grace', 'grace@gmail.com', '$2b$10$samplehashforgrace', 'Patient', '+1234567896', '1st'),
('Emma', 'emma@gmail.com', '$2b$10$samplehashforemma', 'Patient', '+1234567897', '2nd');

-- Insert sample visit records (for doctor dashboard)
INSERT INTO visit_records (patient_id, visit_date, visit_type, notes, follow_up_needed) VALUES
(3, '2024-01-15', 'antenatal', 'First trimester checkup. Patient is doing well. Blood pressure normal, weight gain appropriate.', FALSE),
(3, '2024-02-15', 'antenatal', 'Second trimester checkup. All vitals normal. Baby heartbeat strong.', FALSE),
(4, '2024-01-20', 'antenatal', 'First visit. Patient has some concerns about nutrition. Recommended dietary changes.', TRUE),
(4, '2024-03-10', 'postnatal', 'Post-delivery checkup. Mother and baby healthy. Breastfeeding going well.', FALSE),
(6, '2024-02-10', 'antenatal', 'Third trimester checkup. Patient experiencing mild back pain. Recommended exercises.', FALSE),
(7, '2024-01-25', 'antenatal', 'First trimester checkup. Patient has mild morning sickness. Prescribed supplements.', TRUE),
(8, '2024-02-20', 'antenatal', 'Second trimester checkup. All normal. Patient asking about exercise routine.', FALSE);

-- Insert sample educational materials (for admin dashboard)
INSERT INTO educational_materials (title, category, link_url) VALUES
('Pregnancy Nutrition Guide', 'Nutrition', 'https://example.com/nutrition-guide'),
('Mental Health During Pregnancy', 'Mental Health', 'https://example.com/mental-health'),
('Exercise Guidelines for Pregnant Women', 'Exercise', 'https://example.com/exercise-guide'),
('Antenatal Care Checklist', 'Antenatal', 'https://example.com/antenatal-checklist'),
('Postnatal Recovery Tips', 'Postnatal', 'https://example.com/postnatal-tips'),
('Breastfeeding Guide', 'Postnatal', 'https://example.com/breastfeeding-guide'),
('Pregnancy Exercise Videos', 'Exercise', 'https://example.com/exercise-videos'),
('Stress Management Techniques', 'Mental Health', 'https://example.com/stress-management');

-- Insert sample feedback messages (for admin dashboard)
INSERT INTO feedback_messages (patient_id, message) VALUES
(3, 'I have a question about my next appointment schedule. Can I reschedule for next week?'),
(4, 'The educational materials were very helpful, thank you! The nutrition guide was especially useful.'),
(3, 'I would like to know more about breastfeeding techniques. Are there any classes available?'),
(4, 'Can you provide more information about postpartum depression? I am concerned about this.'),
(6, 'The exercise guidelines were great! I feel much better now.'),
(7, 'I need help with morning sickness. The current remedies are not working.'),
(8, 'Thank you for the mental health resources. They have been very helpful during my pregnancy.');

-- Insert sample health records (original data)
INSERT INTO health_records (user_id, trimester, notes) VALUES
(3, '2nd', 'Patient is doing well. All vitals normal.'),
(4, '1st', 'First trimester checkup completed. Patient has mild concerns about nutrition.'),
(6, '3rd', 'Third trimester checkup. Patient experiencing some back pain.'),
(7, '1st', 'First trimester checkup. Patient has morning sickness.'),
(8, '2nd', 'Second trimester checkup. All normal.');

-- Insert sample reminders (original data)
INSERT INTO reminders (user_id, event_name, event_date) VALUES
(3, 'Next Antenatal Visit', '2024-03-15 10:00:00'),
(4, 'Nutrition Consultation', '2024-02-20 14:00:00'),
(6, 'Final Antenatal Visit', '2024-03-25 11:00:00'),
(7, 'First Trimester Checkup', '2024-02-28 09:00:00'),
(8, 'Second Trimester Checkup', '2024-03-10 15:00:00');

-- Verify the setup
SELECT 'Database setup completed successfully!' as status;
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_visit_records FROM visit_records;
SELECT COUNT(*) as total_educational_materials FROM educational_materials;
SELECT COUNT(*) as total_feedback_messages FROM feedback_messages; 