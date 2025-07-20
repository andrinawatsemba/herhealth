# HerHealth Journey Hub

A comprehensive maternal health application connecting patients with healthcare providers in Uganda.

## Features

- **User Authentication**: Secure registration and login system
- **Role-based Access**: Support for Patients, Doctors, and Admins
- **Pregnancy Tracking**: Trimester-based progress tracking for patients
- **Health Records**: Digital health record management
- **Appointments**: Schedule and manage appointments
- **Reminders**: Health reminder system
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MySQL** database
- **JWT** authentication
- **bcrypt** password hashing
- **CORS** enabled for frontend communication

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **React Query** for data fetching
- **Sonner** for toast notifications

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the backend directory with the following content:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=andrina
   DB_NAME=her_health
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   PORT=5000
   ```

4. **Set up database:**
   - Create a MySQL database named `her_health`
   - Import the `her_health.sql` file to create the required tables

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd herhealth-journey-hub-c88db07e
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/me` - Get current user profile (protected)
- `GET /api/users/dashboard` - Patient dashboard (protected)
- `GET /api/users/dashboard/healthworker` - Health worker dashboard (protected)

### Health Records
- `GET /api/records` - Get health records (protected)
- `POST /api/records` - Create health record (protected)

### Reminders
- `GET /api/reminders` - Get reminders (protected)
- `POST /api/reminders` - Create reminder (protected)

### Advice
- `GET /api/advice` - Get health advice

## User Roles

### Patient
- Register with username, email, password, and trimester
- Access personalized dashboard with pregnancy tracking
- View health records and reminders
- Schedule appointments

### Doctor
- Register as healthcare provider
- View patient list and their information
- Manage patient records
- Provide health advice

### Admin
- System administration
- User management
- System-wide settings

## Project Structure

```
WEBHERHEALTHAPP/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── records.js
│   │   ├── reminders.js
│   │   └── advice.js
│   ├── server.js
│   └── her_health.sql
└── herhealth-journey-hub-c88db07e/
    ├── src/
    │   ├── components/
    │   │   └── ui/
    │   ├── pages/
    │   ├── services/
    │   ├── hooks/
    │   ├── types/
    │   └── utils/
    ├── App.tsx
    └── main.tsx
```

## Development

### Backend Development
- The backend uses nodemon for automatic restarting during development
- API endpoints are prefixed with `/api`
- JWT tokens are used for authentication
- CORS is configured to allow frontend communication

### Frontend Development
- Built with Vite for fast hot module replacement
- TypeScript for type safety
- React Query for server state management
- Form validation with React Hook Form and Zod
- Responsive design with Tailwind CSS

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes with role-based authorization
- Input validation and sanitization
- CORS configuration for secure cross-origin requests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
