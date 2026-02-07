import express, { Request, Response, NextFunction } from "express";
import authService from "../services/auth-service";
import { User, Credentials } from "../models/user";

const router = express.Router();

router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = request.body as User;
        const token = await authService.register(user);
        response.status(201).json(token);
    } catch (err: any) {
        next(err);
    }
});

router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = request.body as Credentials;
        const token = await authService.login(credentials);
        if (!token) {
            response.status(401).send("Incorrect email or password");
            return;
        }
        response.json(token);
    } catch (err: any) {
        next(err);
    }
});

export default router;
