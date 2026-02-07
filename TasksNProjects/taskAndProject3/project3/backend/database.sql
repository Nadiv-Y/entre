-- Create Database
CREATE DATABASE IF NOT EXISTS vacation_system;
USE vacation_system;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Hashed password
    role ENUM('User', 'Admin') DEFAULT 'User',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vacations Table
CREATE TABLE IF NOT EXISTS vacations (
    vacationId INT AUTO_INCREMENT PRIMARY KEY,
    destination VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    imageFilename VARCHAR(255) NOT NULL,
    CONSTRAINT chk_dates CHECK (endDate > startDate)
);

-- Followers Table
CREATE TABLE IF NOT EXISTS followers (
    userId INT NOT NULL,
    vacationId INT NOT NULL,
    PRIMARY KEY (userId, vacationId),
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (vacationId) REFERENCES vacations(vacationId) ON DELETE CASCADE
);

-- Seed Data: Admin User
-- Password is '1234' (This is a simplified seed. In a real scenario, use a generated bcrypt hash)
INSERT INTO users (firstName, lastName, email, password, role) VALUES
('Yanir', 'Admin', 'admin@test.com', '1234', 'Admin'),
('Moses', 'User', 'user@test.com', '1234', 'User');

-- Seed Data: Vacations
INSERT INTO vacations (destination, description, startDate, endDate, price, imageFilename) VALUES
('Maldives', 'Relax in the beautiful islands of Maldives.', '2024-12-01', '2024-12-07', 1500.00, 'maldives.jpg'),
('Paris', 'Experience the romantic city of lights.', '2024-06-15', '2024-06-21', 1200.00, 'paris.jpg'),
('New York', 'The city that never sleeps.', '2024-09-10', '2024-09-17', 1800.00, 'newyork.jpg');

-- Seed Data: Followers
INSERT INTO followers (userId, vacationId) VALUES
(2, 1),
(2, 3);
