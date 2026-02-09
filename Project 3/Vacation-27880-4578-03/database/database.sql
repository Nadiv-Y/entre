-- Create Database
CREATE DATABASE IF NOT EXISTS vacation_27880;
USE vacation_27880;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('User', 'Admin') NOT NULL DEFAULT 'User'
);

-- Vacations Table
CREATE TABLE IF NOT EXISTS vacations (
    vacationId INT AUTO_INCREMENT PRIMARY KEY,
    destination VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    imageName VARCHAR(255) NOT NULL
);

-- Followers Table
CREATE TABLE IF NOT EXISTS followers (
    userId INT NOT NULL,
    vacationId INT NOT NULL,
    PRIMARY KEY (userId, vacationId),
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (vacationId) REFERENCES vacations(vacationId) ON DELETE CASCADE
);

-- Seed Data: Users (Password: '123456')
-- Note: In a real app, passwords should be hashed. This is for initial seed only.
-- We will hash them in the application logic, but for manual testing:
-- Admin
INSERT INTO users (firstName, lastName, email, password, role) VALUES 
('Admin', 'User', 'admin@admin.com', '$2b$10$tJ./s.w.w.w.w.w.w.w.w.w.w.w', 'Admin'); -- Mock hash

-- User
INSERT INTO users (firstName, lastName, email, password, role) VALUES 
('John', 'Doe', 'john@gmail.com', '$2b$10$tJ./s.w.w.w.w.w.w.w.w.w.w.w', 'User');

-- Seed Data: Vacations
INSERT INTO vacations (destination, description, startDate, endDate, price, imageName) VALUES
('Paris, France', 'Experience the city of lights.', '2024-06-01', '2024-06-07', 1200.00, 'paris.jpg'),
('New York, USA', 'The city that never sleeps.', '2024-07-10', '2024-07-17', 1500.00, 'nyc.jpg'),
('Tokyo, Japan', 'Discover the blend of modern and traditional.', '2024-09-05', '2024-09-14', 1800.00, 'tokyo.jpg');

-- Seed Data: Followers
INSERT INTO followers (userId, vacationId) VALUES
(2, 1),
(2, 3);
