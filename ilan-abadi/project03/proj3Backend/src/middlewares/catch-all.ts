import { Request, Response, NextFunction } from "express";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    const status = err.status || 500;
    const message = err.message || "Unknown Error";

    // Log the error for debugging
    console.error(err);

    response.status(status).send(message);
}

export default catchAll;
