-- Drop tables in reverse order of dependencies
DROP TABLE IF EXISTS followers;
DROP TABLE IF EXISTS vacations;
DROP TABLE IF EXISTS users;

-- 1. Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username)
);

-- 2. Vacations Table
CREATE TABLE vacations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT NOT NULL,
    destination VARCHAR(100) NOT NULL,
    imageName VARCHAR(255) NOT NULL,
    fromDate DATE NOT NULL,
    toDate DATE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Followers Table
CREATE TABLE followers (
    userId INT NOT NULL,
    vacationId INT NOT NULL,
    PRIMARY KEY (userId, vacationId),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vacationId) REFERENCES vacations(id) ON DELETE CASCADE,
    INDEX idx_userId (userId),
    INDEX idx_vacationId (vacationId)
);
