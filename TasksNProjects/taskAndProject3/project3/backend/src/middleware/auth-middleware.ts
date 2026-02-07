import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET || "fallback_secret";

export const verifyToken = (request: Request, response: Response, next: NextFunction) => {
    const header = request.header("Authorization");

    // Check if header exists and starts with "Bearer "
    if (!header || !header.startsWith("Bearer ")) {
        response.status(401).send("Unauthorized");
        return;
    }

    // Extract token
    const token = header.substring(7);

    if (!token) {
        response.status(401).send("Unauthorized");
        return;
    }

    // Verify token
    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
            response.status(401).send("Invalid Token");
            return;
        }

        // Add user to request object
        // We'll need to extend Request interface or just cast it
        (request as any).user = decoded.user;
        next();
    });
};
