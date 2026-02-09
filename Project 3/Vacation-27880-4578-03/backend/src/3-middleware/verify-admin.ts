import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import Role from "../4-models/Role";

async function verifyAdmin(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.header("authorization");
    const token = authHeader?.substring(7);

    if (!token) {
        next({ status: 401, message: "You are not logged in" });
        return;
    }

    const isValid = await cyber.verifyToken(token);
    if (!isValid) {
        next({ status: 401, message: "Invalid or expired token" });
        return;
    }

    const user = cyber.getUserFromToken(token);
    if (!user || user.role !== Role.Admin) {
        next({ status: 403, message: "You are not authorized" });
        return;
    }

    next();
}

export default verifyAdmin;
