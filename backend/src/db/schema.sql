-- Create Database
CREATE DATABASE IF NOT EXISTS vacation_tagging_system;
USE vacation_tagging_system;

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'User') NOT NULL DEFAULT 'User'
);

-- Vacations Table
CREATE TABLE IF NOT EXISTS Vacations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT NOT NULL,
    destination VARCHAR(100) NOT NULL,
    image_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Followers Table (Linking Users and Vacations)
CREATE TABLE IF NOT EXISTS Followers (
    user_id INT NOT NULL,
    vacation_id INT NOT NULL,
    PRIMARY KEY (user_id, vacation_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (vacation_id) REFERENCES Vacations(id) ON DELETE CASCADE
);
