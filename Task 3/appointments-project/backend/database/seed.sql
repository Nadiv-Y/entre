-- Seed Data for Appointments Project

-- Insert sample Development Teams
INSERT INTO development_teams (name) VALUES 
('Alpha Squad'),
('Beta Builders'),
('Gamma Group'),
('Delta Devs');

-- Insert sample Meetings
-- Assuming IDs 1-4 for the teams inserted above

-- Meetings for Alpha Squad (ID 1)
INSERT INTO meetings (teamId, startTime, endTime, description, room) VALUES
(1, '2025-02-10 09:00:00', '2025-02-10 10:00:00', 'Daily Standup', 'Room A'),
(1, '2025-02-12 14:00:00', '2025-02-12 15:30:00', 'Sprint Planning', 'Conference Room 1');

-- Meetings for Beta Builders (ID 2)
INSERT INTO meetings (teamId, startTime, endTime, description, room) VALUES
(2, '2025-02-10 10:00:00', '2025-02-10 11:00:00', 'Design Review', 'Room B'),
(2, '2025-02-11 11:00:00', '2025-02-11 12:00:00', 'Team Sync', 'Room A');

-- Meetings for Gamma Group (ID 3)
INSERT INTO meetings (teamId, startTime, endTime, description, room) VALUES
(3, '2025-02-10 13:00:00', '2025-02-10 14:00:00', 'Tech Talk', 'Auditorium');

-- Meetings for Delta Devs (ID 4)
INSERT INTO meetings (teamId, startTime, endTime, description, room) VALUES
(4, '2025-02-13 16:00:00', '2025-02-13 17:00:00', 'Retrospective', 'Room C');
