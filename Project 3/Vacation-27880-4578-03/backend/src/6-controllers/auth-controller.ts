import express, { NextFunction, Request, Response } from "express";
import User from "../4-models/User";
import Credentials from "../4-models/Credentials";
import authLogic from "../5-logic/auth-logic";

const router = express.Router();

router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new User(request.body);
        const token = await authLogic.register(user);
        response.status(201).json(token);
    }
    catch (err) {
        next(err);
    }
});

router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new Credentials(request.body);
        const token = await authLogic.login(credentials);
        response.json(token);
    }
    catch (err) {
        next(err);
    }
});

export default router;
