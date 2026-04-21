import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/user-model";

dotenv.config();

const salt = bcrypt.genSaltSync(10);
const pepper = process.env.PEPPER || "";

const hashPassword = (plainText: string): string => {
    if (!plainText) return "";
    return bcrypt.hashSync(plainText + pepper, salt);
}

const comparePassword = (plainText: string, hash: string): boolean => {
    if (!plainText || !hash) return false;
    return bcrypt.compareSync(plainText + pepper, hash);
}

const generateNewToken = (user: UserModel): string => {
    const container = { user };
    const options: jwt.SignOptions = { expiresIn: "3h" };
    return jwt.sign(container, process.env.JWT_SECRET || "default_secret", options);
}

export default {
    hashPassword,
    comparePassword,
    generateNewToken
};
