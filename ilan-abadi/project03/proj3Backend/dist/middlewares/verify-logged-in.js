"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function verifyLoggedIn(request, response, next) {
    // Expected header: "Bearer <token>"
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
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        request.user = payload.user;
        next();
    }
    catch (err) {
        response.status(401).send("Your login session has expired");
        return;
    }
}
exports.default = verifyLoggedIn;
