import { Request, Response, NextFunction } from "express";
import { Role } from "../models/user";

export const verifyAdmin = (request: Request, response: Response, next: NextFunction) => {
    const user = (request as any).user;
    if (!user || user.role !== Role.Admin) {
        response.status(403).send("Admin Access Required");
        return;
    }
    next();
};
