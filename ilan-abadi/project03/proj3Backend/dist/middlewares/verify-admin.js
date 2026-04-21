"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function verifyAdmin(request, response, next) {
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
        const user = payload.user;
        if (user.role !== "Admin") {
            response.status(403).send("You do not have permission to perform this action");
            return;
        }
        request.user = user;
        next();
    }
    catch (err) {
        response.status(401).send("Your login session has expired");
        return;
    }
}
exports.default = verifyAdmin;
