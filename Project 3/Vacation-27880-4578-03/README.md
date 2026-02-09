# Vacation Management System

A full-stack web application for managing and tracking vacations, built with React, Node.js, and MySQL.

## Prerequisites
*   **Node.js**: Installed on your machine.
*   **MySQL**: Installed and running (locally or via Docker).

## Database Setup
1.  Navigate to the `database` folder.
2.  Execute `database/database.sql` (if it exists) or manually create a database named `vacations_db` if not handled by schema.
3.  Run `database/schema.sql` to create the tables (`users`, `vacations`, `followers`).
4.  Run `database/seed.sql` to insert initial data (admin, users, and vacations).

## Backend Setup
1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    *   Duplicate `.env.example` to create `.env`.
    *   Update DB credentials (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) and `PORT` if needed.
    *   Example:
        ```env
        PORT=3001
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=yourpassword
        DB_NAME=vacations_db
        JWT_SECRET=your_secret_key
        ```
4.  Start the server:
    ```bash
    npm start
    ```
    (Runs on port 3001 by default).

## Frontend Setup
1.  Navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    (Usually runs on port 5173).

## Running concurrently (Optional)
A root `package.json` is provided to run both backend and frontend simultaneously.
1.  Install root dependencies:
    ```bash
    npm install
    ```
2.  Run the dev script:
    ```bash
    npm run dev
    ```

## Admin Credentials
The `seed.sql` script creates an admin account.
*   **Username**: `admin`
*   **Password**: The seed uses a hashed placeholder. If `admin` / `1234` does not work:
    1.  Register a new user via the App.
    2.  Update the user's role to 'admin' in the database:
        ```sql
        UPDATE users SET role = 'admin' WHERE username = 'your_username';
        ```

## Features
*   **Authentication**: Login/Register (JWT).
*   **Vacations**: proper display, chronological sorting, follow logic.
*   **Admin**: Add/Edit/Delete vacations, Real-time updates via Socket.io, Charts.
*   **Tech Stack**: React (MUI), Node.js (Express), MySQL, Redux Toolkit, Socket.io.
