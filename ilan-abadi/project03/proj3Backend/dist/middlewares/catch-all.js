"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function catchAll(err, request, response, next) {
    const status = err.status || 500;
    const message = err.message || "Unknown Error";
    // Log the error for debugging
    console.error(err);
    response.status(status).send(message);
}
exports.default = catchAll;
