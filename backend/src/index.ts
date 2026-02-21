import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './db/connection'; // This will initialize the pool and log connection status
import authRouter from './auth';
import vacationsRouter from './routes/vacations';
import followersRouter from './routes/followers';
import path from 'path';
import { createServer } from 'http';
import { initSocket } from './utils/socket';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Create standard HTTP server
const httpServer = createServer(app);

// Initialize Socket.io
initSocket(httpServer);

app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), '..', 'uploads')));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/vacations', vacationsRouter);
app.use('/api/followers', followersRouter);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Vacation Tagging System Backend is running!' });
});

import { hashPassword } from './utils/security';

app.get("/api/fix-admin", async (req, res) => {
    const newHash = await hashPassword("admin1234");
    res.send(`UPDATE users SET password = '${newHash}' WHERE username = 'admin@mail.com';`);
});

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

