import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user-model";
import cyber from "../utils/cyber";
import db from "../utils/db";

async function register(request: Request, response: Response, next: NextFunction) {
    try {
        const user = new UserModel(request.body);
        const error = user.validate();
        if (error) {
            response.status(400).send(error);
            return;
        }

        // Check if username exists
        const sqlCheck = `SELECT * FROM users WHERE username = ?`;
        const users = await db.execute(sqlCheck, [user.username]);
        if (users.length > 0) {
            response.status(400).send("Username already exists");
            return;
        }

        // Hash password
        user.password = cyber.hashPassword(user.password!);

        // Insert into DB
        const sqlInsert = `INSERT INTO users (first_name, last_name, username, password, role) VALUES (?, ?, ?, ?, ?)`;
        const result = await db.execute(sqlInsert, [user.firstName, user.lastName, user.username, user.password, "User"]);
        user.id = result.insertId;

        // Remove password from response
        delete user.password;

        // Generate token
        const token = cyber.generateNewToken(user);

        response.status(201).json({ token });
    } catch (err: any) {
        next(err);
    }
}

async function login(request: Request, response: Response, next: NextFunction) {
    try {
        const user = new UserModel(request.body);

        // Basic validation for login (username/password existence)
        if (!user.username || !user.password) {
            response.status(400).send("Missing credentials");
            return;
        }

        const sql = `SELECT * FROM users WHERE username = ?`;
        const users = await db.execute(sql, [user.username]);
        const dbUser = users[0];

        if (!dbUser || !cyber.comparePassword(user.password, dbUser.password)) {
            response.status(401).send("Incorrect username or password");
            return;
        }

        // Convert DB user to Model
        const loggedInUser = new UserModel({
            id: dbUser.id,
            firstName: dbUser.first_name,
            lastName: dbUser.last_name,
            username: dbUser.username,
            role: dbUser.role
        });

        const token = cyber.generateNewToken(loggedInUser);

        response.json({ token });
    } catch (err: any) {
        next(err);
    }
}

export default {
    register,
    login
};
