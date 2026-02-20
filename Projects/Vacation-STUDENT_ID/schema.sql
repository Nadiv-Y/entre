CREATE DATABASE IF NOT EXISTS vacations_db;
USE vacations_db;

CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  first_name    VARCHAR(50)  NOT NULL,
  last_name     VARCHAR(50)  NOT NULL,
  username      VARCHAR(100) NOT NULL UNIQUE,
  password      VARCHAR(255) NOT NULL,
  is_admin      BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS vacations (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  destination      VARCHAR(100)  NOT NULL,
  description      TEXT          NOT NULL,
  start_date       DATE          NOT NULL,
  end_date         DATE          NOT NULL,
  price            DECIMAL(10,2) NOT NULL,
  image_filename   VARCHAR(255)  NOT NULL,
  follower_count   INT           NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS users_vacations (
  user_id      INT NOT NULL,
  vacation_id  INT NOT NULL,
  PRIMARY KEY  (user_id, vacation_id),
  FOREIGN KEY  (user_id)     REFERENCES users(id)     ON DELETE CASCADE,
  FOREIGN KEY  (vacation_id) REFERENCES vacations(id) ON DELETE CASCADE
);


INSERT INTO users (first_name, last_name, username, password, is_admin) VALUES ('Admin', 'admin', 'admin@vacation.com', 'admin123', TRUE);
