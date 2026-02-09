import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../4-models/User";

const saltRounds = 10;

// Hash password with bcrypt
async function hash(plainText: string): Promise<string> {
    if (!plainText) return "";
    return await bcrypt.hash(plainText, saltRounds);
}

// Compare password with bcrypt
async function compare(plainText: string, hash: string): Promise<boolean> {
    if (!plainText || !hash) return false;
    return await bcrypt.compare(plainText, hash);
}

// Generate JWT
function getNewToken(user: User): string {
    // Remove sensitive data from payload
    const container = {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            role: user.role
        }
    };
    const options: jwt.SignOptions = { expiresIn: "3h" };
    const secret = process.env.JWT_SECRET || "secret";
    const token = jwt.sign(container, secret, options);
    return token;
}

// Verify JWT
function verifyToken(token: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const secret = process.env.JWT_SECRET || "secret";
            jwt.verify(token, secret, (err: jwt.VerifyErrors | null, container: any) => {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        }
        catch (err) {
            resolve(false);
        }
    });
}

// Get user from JWT
function getUserFromToken(token: string): User | null {
    try {
        const container = jwt.decode(token) as { user: User };
        return container.user;
    }
    catch (err) {
        return null;
    }
}

export default {
    hash,
    compare,
    getNewToken,
    verifyToken,
    getUserFromToken
};
