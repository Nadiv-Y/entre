import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function verifyAdmin(request: Request, response: Response, next: NextFunction) {
    const header = request.header("authorization");
    if (!header) {
        response.status(401).send("You are not logged in");
        return;
    }

    const token = header.substring(7);
    if (!token) {
        response.status(401).send("You are not logged in");
        return;
    }

    try {
        const payload: any = jwt.verify(token, process.env.JWT_SECRET as string);
        const user = payload.user;

        if (user.role !== "Admin") {
            response.status(403).send("You do not have permission to perform this action");
            return;
        }

        (request as any).user = user;
        next();
    } catch (err: any) {
        response.status(401).send("Your login session has expired");
        return;
    }
}

export default verifyAdmin;
