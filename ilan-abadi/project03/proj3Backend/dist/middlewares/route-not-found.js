"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function routeNotFound(request, response, next) {
    const err = new Error(`Route ${request.originalUrl} not found`);
    err.status = 404;
    next(err);
}
exports.default = routeNotFound;
