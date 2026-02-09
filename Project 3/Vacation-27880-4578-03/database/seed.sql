USE vacations_db;

-- 1. Insert Users (1 Admin, multiple Users)
-- Note: 'passwordHash' should be a real hash in production. Using placeholder for seed.
INSERT INTO users (firstName, lastName, username, passwordHash, role) VALUES 
('David', 'Admin', 'admin', '$2b$10$DAgT8LWztY6CrFjwyMeEquDpVXMZzJl7rYyZSL90wSet.i767CKO6', 'admin'),
('John', 'Doe', 'john', '$2b$10$tJ./s.w.w.w.w.w.w.w.w.w.w.w', 'user'),
('Jane', 'Smith', 'jane', '$2b$10$tJ./s.w.w.w.w.w.w.w.w.w.w.w', 'user'),
('Mike', 'Jordan', 'mike', '$2b$10$tJ./s.w.w.w.w.w.w.w.w.w.w.w', 'user');

-- 2. Insert Vacations (8-12 items, mixed dates)
INSERT INTO vacations (destination, description, fromDate, toDate, price, imageName) VALUES
('Paris, France', 'Experience the city of lights and love. Visit the Eiffel Tower and Louvre.', '2025-06-01', '2025-06-07', 1200.00, 'paris.jpg'),
('New York, USA', 'The city that never sleeps. Times Square, Central Park, and Broadway.', '2025-07-10', '2025-07-17', 1500.00, 'nyc.jpg'),
('Tokyo, Japan', 'Discover the blend of modern neon and traditional temples.', '2025-09-05', '2025-09-14', 1800.00, 'tokyo.jpg'),
('Bali, Indonesia', 'Tropical paradise with pure beaches and coral reefs.', '2024-12-01', '2024-12-10', 800.00, 'bali.jpg'),
('Rome, Italy', 'Walk through history in the eternal city. Colosseum and Vatican.', '2025-04-15', '2025-04-22', 1100.00, 'rome.jpg'),
('Santorini, Greece', 'White buildings, blue domes, and stunning sunsets.', '2025-05-20', '2025-05-27', 1300.00, 'santorini.jpg'),
('Bora Bora', 'Luxury overwater bungalows and turquoise lagoons.', '2024-11-10', '2024-11-17', 3000.00, 'bora_bora.jpg'),
('London, UK', 'Historic landmarks, red buses, and royal palaces.', '2025-03-01', '2025-03-07', 1000.00, 'london.jpg'),
('Dubai, UAE', 'Skyscrapers, luxury shopping, and desert adventures.', '2024-10-05', '2024-10-12', 1600.00, 'dubai.jpg'),
('Sydney, Australia', 'Opera House, Harbour Bridge, and beautiful beaches.', '2024-12-20', '2025-01-03', 2000.00, 'sydney.jpg');

-- 3. Insert Followers (Simulate counts)
INSERT INTO followers (userId, vacationId) VALUES
(2, 1), -- John follows Paris
(2, 3), -- John follows Tokyo
(2, 7), -- John follows Bora Bora
(3, 1), -- Jane follows Paris
(3, 2), -- Jane follows NYC
(3, 4), -- Jane follows Bali
(3, 8), -- Jane follows London
(4, 3), -- Mike follows Tokyo
(4, 5), -- Mike follows Rome
(4, 9); -- Mike follows Dubai
