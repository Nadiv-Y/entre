import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { JWT_SECRET, PEPPER } from './config';

/**
 * Hash a password with a salt and pepper
 * @param password The plain text password
 * @returns The hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
    // Append pepper to the password
    const pepperedPassword = password + PEPPER;

    // Generate salt and hash
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(pepperedPassword, salt);

    return hash;
};

/**
 * Verify a password against a hash using pepper
 * @param password The plain text password from login
 * @param hash The hashed password from the database
 * @returns true if valid
 */
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
    const pepperedPassword = password + PEPPER;
    return await bcrypt.compare(pepperedPassword, hash);
};

/**
 * Generate a JWT token for a user
 * @param user The user to generate a token for
 * @returns The JWT string
 */
export const generateToken = (user: User): string => {
    // We don't want to include the password in the payload
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name
    };

    // Token expires in 2 hours
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
};
