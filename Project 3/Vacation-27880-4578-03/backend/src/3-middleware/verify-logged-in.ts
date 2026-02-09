import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.header("authorization");
    const token = authHeader?.substring(7); // "Bearer token"

    if (!token) {
        next({ status: 401, message: "You are not logged in" });
        return;
    }

    const isValid = await cyber.verifyToken(token);
    if (!isValid) {
        next({ status: 401, message: "Invalid or expired token" });
        return;
    }

    next();
}

export default verifyLoggedIn;
