import { Request, Response, NextFunction } from "express";

function routeNotFound(request: Request, response: Response, next: NextFunction) {
    const err = new Error(`Route ${request.originalUrl} not found`);
    (err as any).status = 404;
    next(err);
}

export default routeNotFound;
