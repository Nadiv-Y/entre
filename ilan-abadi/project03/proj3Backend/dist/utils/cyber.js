"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const salt = bcryptjs_1.default.genSaltSync(10);
const pepper = process.env.PEPPER || "";
const hashPassword = (plainText) => {
    if (!plainText)
        return "";
    return bcryptjs_1.default.hashSync(plainText + pepper, salt);
};
const comparePassword = (plainText, hash) => {
    if (!plainText || !hash)
        return false;
    return bcryptjs_1.default.compareSync(plainText + pepper, hash);
};
const generateNewToken = (user) => {
    const container = { user };
    const options = { expiresIn: "3h" };
    return jsonwebtoken_1.default.sign(container, process.env.JWT_SECRET || "default_secret", options);
};
exports.default = {
    hashPassword,
    comparePassword,
    generateNewToken
};
