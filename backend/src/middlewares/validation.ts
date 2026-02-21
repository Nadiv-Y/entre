import { Request, Response, NextFunction } from 'express';

// Middleware to validate Registration data
export const validateRegistration = (req: Request, res: Response, next: NextFunction): void => {
    const { first_name, last_name, username, password } = req.body;

    if (!first_name || !last_name || !username || !password) {
        res.status(400).json({ error: 'All fields are mandatory: first_name, last_name, username, password' });
        return;
    }

    if (password.length < 4) {
        res.status(400).json({ error: 'Password must be at least 4 characters long' });
        return;
    }

    next();
};

// Middleware to validate Login data
export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ error: 'Username and password are required' });
        return;
    }

    next();
};

// Usage of Joi / Zod would be better, but we are keeping it simple based on requirements.
