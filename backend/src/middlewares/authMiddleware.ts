import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/config';

// Define a custom interface for the Request to include the user
export interface AuthRequest extends Request {
    user?: any;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    // Check for token in headers (e.g., Authorization: Bearer <token>)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized: No token provided' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to the request object
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
        return;
    }
};

export const verifyAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    // This middleware should run AFTER verifyToken
    if (!req.user || req.user.role !== 'Admin') {
        res.status(403).json({ error: 'Forbidden: Admin access required' });
        return;
    }
    next();
};
