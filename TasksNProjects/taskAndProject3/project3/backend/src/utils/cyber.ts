import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user";

dotenv.config();

const saltRounds = 10;
const secretKey = process.env.JWT_SECRET || "fallback_secret";

const hashPassword = (plainTextPassword: string): string => {
    if (!plainTextPassword) return "";
    return bcrypt.hashSync(plainTextPassword, saltRounds);
};

const comparePassword = (plainTextPassword: string, hash: string): boolean => {
    if (!plainTextPassword || !hash) return false;
    return bcrypt.compareSync(plainTextPassword, hash);
};

const getNewToken = (user: User): string => {
    const payload = { user };
    return jwt.sign(payload, secretKey, { expiresIn: "2h" });
};

export default {
    hashPassword,
    comparePassword,
    getNewToken
};
