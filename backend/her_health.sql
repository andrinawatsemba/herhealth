-- Drop and recreate database for clean setup
DROP DATABASE IF EXISTS her_health;
CREATE DATABASE her_health;
USE her_health;

-- Users table
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

-- Health Records table
CREATE TABLE health_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  trimester ENUM('1st', '2nd', '3rd'),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Reminders table
CREATE TABLE reminders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  event_name VARCHAR(100) NOT NULL,
  event_date DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Advice table
CREATE TABLE advice (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trimester ENUM('Pre-trimester', '1st', '2nd', '3rd') NOT NULL,
  content TEXT NOT NULL
);

-- Health Tips table
CREATE TABLE health_tips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL
);

-- Insert static advice
INSERT INTO advice (trimester, content) VALUES
('Pre-trimester', 'Start prenatal vitamins, avoid alcohol/smoking, maintain healthy weight.'),
('1st', 'Take folic acid, stay hydrated, eat small meals, rest.'),
('2nd', 'Moderate exercise, monitor baby movements, attend antenatal visits.'),
('3rd', 'Prepare for delivery, birth plan, look out for labor signs.');

-- Insert static health tips
INSERT INTO health_tips (title, content) VALUES
('Nutrition during pregnancy', 'Eat iron-rich foods like beans and greens.'),
('Importance of hydration', 'Drink 8–10 glasses of water daily.'),
('Antenatal visits', 'Go for at least 4 before delivery.'),
('Warning signs', 'Bleeding, severe headaches, strong abdominal pain.');

-- Insert sample users
INSERT INTO users (username, email, password, role, trimester) VALUES
('Hida', 'hidaya@gmail.com', '$2b$10$samplehashforhida', 'Patient', '2nd'),
('Cath', 'cathy@gmail.com', '$2b$10$samplehashforcath', 'Patient', '1st'),
('Nurse123', 'nurse@clinic.com', '$2b$10$samplehashfornurse', 'Health Worker', NULL);