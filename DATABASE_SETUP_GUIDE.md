# Database Setup Guide for Her Health App

## Problem
You can't add data in the admin dashboard or add visit records in the doctor dashboard because the required database tables don't exist in your MySQL database.

## Solution
Run the complete database setup script to create all necessary tables and sample data.

## Step-by-Step Instructions

### 1. Open MySQL Command Line or Workbench
- Open MySQL Command Line Client, or
- Open MySQL Workbench, or
- Use any MySQL client you prefer

### 2. Run the Database Setup Script

**Option A: Using Command Line**
```bash
mysql -u root -p < database_setup.sql
```

**Option B: Using MySQL Workbench**
1. Open the `database_setup.sql` file
2. Copy all the content
3. Paste it into MySQL Workbench query editor
4. Click "Execute" or press Ctrl+Shift+Enter

**Option C: Using Command Line (Step by Step)**
```bash
mysql -u root -p
```
Then copy and paste the content of `database_setup.sql` file.

### 3. Verify the Setup
After running the script, you should see output like:
```
Database setup completed successfully!
total_users: 8
total_visit_records: 7
total_educational_materials: 8
total_feedback_messages: 7
```

## What the Script Creates

### Original Tables (from existing app):
- `users` - User accounts (patients, doctors, admins)
- `health_records` - Patient health records
- `reminders` - Patient reminders
- `advice` - Trimester-specific advice
- `health_tips` - General health tips

### New Tables (for admin/doctor dashboards):
- `visit_records` - Patient visit records (for doctor dashboard)
- `educational_materials` - Educational content (for admin dashboard)
- `feedback_messages` - Patient feedback (for admin dashboard)

## Sample Data Included

### Users:
- **Admin**: admin@herhealth.com (role: Admin)
- **Doctor**: doctor@herhealth.com (role: Doctor)
- **Patients**: 6 sample patients with different trimesters
- **Health Worker**: nurse@clinic.com (role: Health Worker)

### Visit Records:
- 7 sample visit records with different patients
- Mix of antenatal and postnatal visits
- Some with follow-up needed

### Educational Materials:
- 8 sample educational materials
- Different categories: Nutrition, Mental Health, Exercise, etc.

### Feedback Messages:
- 7 sample feedback messages from patients
- Mix of read and unread messages

## Login Credentials

After running the script, you can login with:

**Admin Dashboard:**
- Email: admin@herhealth.com
- Password: (use the password you set up in your auth system)

**Doctor Dashboard:**
- Email: doctor@herhealth.com
- Password: (use the password you set up in your auth system)

## Troubleshooting

### If you get permission errors:
```sql
-- Grant permissions to your user
GRANT ALL PRIVILEGES ON her_health.* TO 'your_username'@'localhost';
FLUSH PRIVILEGES;
```

### If the database already exists:
The script will drop and recreate the database. If you have important data, backup first:
```sql
-- Backup existing database
mysqldump -u root -p her_health > backup_her_health.sql

-- Then run the setup script
```

### If you get foreign key errors:
Make sure you're running the script in the correct order (the script handles this automatically).

## After Setup

1. **Start your backend server:**
   ```bash
   cd backend
   npm start
   ```

2. **Start your frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test the functionality:**
   - Login as admin and try adding educational materials
   - Login as doctor and try adding visit records
   - Check that all data displays correctly

## Expected Results

After running the script, you should be able to:
- ✅ Add educational materials in admin dashboard
- ✅ Add visit records in doctor dashboard
- ✅ View all existing data in tables
- ✅ Search and filter data
- ✅ See analytics charts with real data

The admin and doctor dashboards should now work fully with the database! 