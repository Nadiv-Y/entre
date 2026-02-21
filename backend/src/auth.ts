import express, { Request, Response } from 'express';
import pool from './db/connection';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { hashPassword, verifyPassword, generateToken } from './utils/security';
import { validateRegistration, validateLogin } from './middlewares/validation';
import { User } from './models/User';
import { PEPPER } from './utils/config';

const router = express.Router();

// Register Route
router.post('/register', validateRegistration, async (req: Request, res: Response): Promise<void> => {
    try {
        const { first_name, last_name, username, password } = req.body;

        // 1. Check if username already exists
        const [existingUsers] = await pool.query<RowDataPacket[]>('SELECT * FROM Users WHERE username = ?', [username]);

        if (existingUsers.length > 0) {
            res.status(400).json({ error: 'Username already exists' });
            return;
        }

        // 2. Hash password (with salt and pepper handled inside hashPassword)
        const hashedPassword = await hashPassword(password);

        // 3. Save to database (Role is 'User' by default per our schema)
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO Users (first_name, last_name, username, password) VALUES (?, ?, ?, ?)',
            [first_name, last_name, username, hashedPassword]
        );

        // 4. Return success and new auth token
        const newUser: User = {
            id: result.insertId,
            first_name,
            last_name,
            username,
            role: 'User'
        };

        const token = generateToken(newUser);

        res.status(201).json({ message: 'Registration successful', token });
    } catch (error: any) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login Route
router.post('/login', validateLogin, async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        // 1. Retrieve user by username
        const [users] = await pool.query<RowDataPacket[]>('SELECT * FROM Users WHERE username = ?', [username]);

        if (users.length === 0) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }

        const user = users[0] as User;

        console.log("--- DEBUG LOGIN ---");
        console.log("Input Password:", password);
        console.log("Pepper from Config:", PEPPER);
        console.log("Hashed Password from DB:", user.password);

        // 2. Verify password (append pepper and check hash handled inside verifyPassword)
        const isValid = await verifyPassword(password, user.password as string);

        if (!isValid) {
            res.status(401).json({ error: 'Invalid username or password' });
            return;
        }

        // 3. Generate Token
        const token = generateToken(user);

        res.json({ message: 'Login successful', token });
    } catch (error: any) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
