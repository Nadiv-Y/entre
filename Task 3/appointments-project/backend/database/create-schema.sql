-- Database Schema for Appointments Project
-- 
-- Explanation:
-- 1. development_teams: Stores team information. 'id' is the primary key.
-- 2. meetings: Stores meeting details. Links to development_teams via 'teamId'.
--    - Indexes added on 'teamId' for fast lookup of team meetings.
--    - Composite index on (room, startTime, endTime) to help with room availability/overlap checks.
--    - Composite index on (teamId, startTime, endTime) for team schedule queries.

CREATE TABLE IF NOT EXISTS development_teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS meetings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teamId INT NOT NULL,
    startTime DATETIME NOT NULL,
    endTime DATETIME NOT NULL,
    description TEXT NOT NULL,
    room VARCHAR(255) NOT NULL,
    CONSTRAINT fk_team FOREIGN KEY (teamId) REFERENCES development_teams(id) ON DELETE CASCADE
);

-- Index to support "get meetings by team"
CREATE INDEX idx_meetings_teamId ON meetings(teamId);

-- Index to support overlap checks for a specific room
-- Helps find if a room is booked during a specific time range
CREATE INDEX idx_meetings_room_time ON meetings(room, startTime, endTime);

-- Index to support overlap checks for a specific team (avoid double booking a team)
CREATE INDEX idx_meetings_team_time ON meetings(teamId, startTime, endTime);
