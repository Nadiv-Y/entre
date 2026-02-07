# Vacation Management System (Backend)

## Overview
A RESTful API for managing vacations, followers, and reports.
Built with Node.js, Express, MySQL, and Socket.IO.

## Prerequisites
- Node.js (v18+)
- MySQL Server

## Setup

1. **Database Setup**
   - Execute `database.sql` in MySQL Workbench to create the schema and seed data.
   - Configure `.env` with your DB credentials:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=your_password
     DB_NAME=vacation_system
     PORT=3001
     JWT_SECRET=mysecretkey
     ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Server**
   ```bash
   npm start
   ```
   The server will start on `http://localhost:3001`.

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login and receive JWT.

### Vacations (Protected)
- `GET /api/vacations` - Get all vacations (sorted by followed, then date).
- `POST /api/vacations/follows/:vacationId` - Follow a vacation.
- `DELETE /api/vacations/follows/:vacationId` - Unfollow a vacation.

### Admin (Protected + Admin Role)
- `POST /api/vacations` - Add a new vacation (Multipart form-data: `destination`, `description`, `startDate`, `endDate`, `price`, `image`).
- `PUT /api/vacations/:id` - Update a vacation.
- `DELETE /api/vacations/:id` - Delete a vacation.
- `GET /api/reports/followers` - Get follower statistics for graph.

## Real-time (Socket.IO)
Connect to `http://localhost:3001`.
Events:
- `admin-add-vacation`
- `admin-update-vacation`
- `admin-delete-vacation`

## Project Structure
- `src/app.ts` - Entry point.
- `src/dal` - Database connection.
- `src/models` - TypeScript interfaces.
- `src/services` - Business logic.
- `src/controllers` - Request handlers.
- `src/middleware` - Auth and Admin verification.
- `src/utils` - Helper functions (Cyber, Socket).
