# Admin Dashboard Setup Guide

## Overview
The Admin Dashboard has been successfully implemented with all the requested MVP features:

✅ **Dashboard Overview Cards**
- Total Registered Patients
- Total Antenatal Visits  
- Total Postnatal Visits
- Total Educational Materials Uploaded
- Total Feedback Messages

✅ **Simple Analytics Charts**
- Line Chart: Monthly antenatal vs postnatal visits
- Pie Chart: Patient distribution by care type (trimester)
- Bar Chart: Educational materials by category

✅ **Patient Management**
- Table of all registered patients
- Search/filter functionality
- Columns: Full Name, Phone Number, Registration Date, Care Type

✅ **Visit Records** (Doctor Dashboard)
- View all visit records
- Add new visit records with form
- Fields: Visit Date, Visit Type, Notes, Follow-up Needed

✅ **Educational Materials Management**
- Upload new educational materials
- Fields: Title, Category, PDF/Link URL
- View and delete existing materials

✅ **Feedback Management**
- Table of all patient feedback messages
- Columns: Patient Name, Message, Date, Read Status
- Mark as Read functionality

## Database Setup

### 1. Run the Database Migration
Execute the following SQL commands in your MySQL database:

```sql
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
```

### 2. Create an Admin User
Register a new user with the 'Admin' role through the registration page or directly in the database:

```sql
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@herhealth.com', '$2b$10$samplehashforadmin', 'Admin');
```

## Running the Application

### Backend
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Start the server: `npm start` or `node server.js`

### Frontend
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Accessing the Admin Dashboard

1. Login with an admin account (role: 'Admin')
2. You will be automatically redirected to the Admin Dashboard
3. Alternatively, navigate to `/admin` directly

## Features Implemented

### Dashboard Overview
- Clean, modern UI with summary cards
- Real-time statistics from the database
- Responsive design for all screen sizes

### Analytics Charts
- **Monthly Visits Chart**: Line chart showing antenatal vs postnatal visits over time
- **Care Type Distribution**: Pie chart showing patient distribution by trimester
- **Material Categories**: Bar chart showing educational materials by category
- All charts are interactive with tooltips and legends

### Patient Management
- Complete patient list with search functionality
- Filter by name or email
- View patient details and registration information
- Clean table layout with proper sorting

### Visit Records
- View all visit records in a table format
- Add new visit records with a comprehensive form
- Track visit types, dates, notes, and follow-up requirements
- Real-time updates when new records are added

### Educational Materials
- Upload new educational materials with title, category, and URLs
- View existing materials in a table format
- Delete materials with confirmation
- Support for both file URLs and external links

### Feedback Management
- View all patient feedback messages
- Mark messages as read/unread
- Track message dates and patient information
- Clean interface for managing patient communications

## Technical Implementation

### Frontend
- **React 18** with TypeScript
- **Recharts** for data visualization
- **Tailwind CSS** for styling
- **Shadcn/ui** components for consistent UI
- **React Router** for navigation
- **React Hook Form** for form handling

### Backend
- **Node.js** with Express
- **MySQL** database
- **JWT** authentication
- **Role-based authorization** middleware
- **RESTful API** endpoints

### API Endpoints

**Admin Dashboard:**
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/patients` - All patients
- `GET /api/admin/materials` - All educational materials
- `POST /api/admin/materials` - Create educational material
- `DELETE /api/admin/materials/:id` - Delete educational material
- `GET /api/admin/feedback` - All feedback messages
- `PUT /api/admin/feedback/:id/read` - Mark feedback as read
- `GET /api/admin/analytics/*` - Analytics data

**Doctor Dashboard:**
- `GET /api/doctor/patients` - All patients
- `GET /api/doctor/visits` - All visit records
- `POST /api/doctor/visits` - Create visit record

## Security Features
- JWT token authentication
- Role-based access control
- Protected routes for admin-only access
- Input validation and sanitization
- SQL injection prevention

## Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Adaptive charts and tables
- Touch-friendly interface elements

The Admin Dashboard is now fully functional and ready for use! All MVP features have been implemented with a clean, modern UI and minimal dependencies as requested. 