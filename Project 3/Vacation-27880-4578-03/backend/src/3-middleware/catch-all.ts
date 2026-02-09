import { NextFunction, Request, Response } from "express";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    console.log(err);
    const statusCode = err.status || 500;
    const message = err.message || "Unknown Error";
    response.status(statusCode).send(message);
}

export default catchAll;
