"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user-model"));
const cyber_1 = __importDefault(require("../utils/cyber"));
const db_1 = __importDefault(require("../utils/db"));
function register(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = new user_model_1.default(request.body);
            const error = user.validate();
            if (error) {
                response.status(400).send(error);
                return;
            }
            // Check if username exists
            const sqlCheck = `SELECT * FROM users WHERE username = ?`;
            const users = yield db_1.default.execute(sqlCheck, [user.username]);
            if (users.length > 0) {
                response.status(400).send("Username already exists");
                return;
            }
            // Hash password
            user.password = cyber_1.default.hashPassword(user.password);
            // Insert into DB
            const sqlInsert = `INSERT INTO users (first_name, last_name, username, password, role) VALUES (?, ?, ?, ?, ?)`;
            const result = yield db_1.default.execute(sqlInsert, [user.firstName, user.lastName, user.username, user.password, "User"]);
            user.id = result.insertId;
            // Remove password from response
            delete user.password;
            // Generate token
            const token = cyber_1.default.generateNewToken(user);
            response.status(201).json({ token });
        }
        catch (err) {
            next(err);
        }
    });
}
function login(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = new user_model_1.default(request.body);
            // Basic validation for login (username/password existence)
            if (!user.username || !user.password) {
                response.status(400).send("Missing credentials");
                return;
            }
            const sql = `SELECT * FROM users WHERE username = ?`;
            const users = yield db_1.default.execute(sql, [user.username]);
            const dbUser = users[0];
            if (!dbUser || !cyber_1.default.comparePassword(user.password, dbUser.password)) {
                response.status(401).send("Incorrect username or password");
                return;
            }
            // Convert DB user to Model
            const loggedInUser = new user_model_1.default({
                id: dbUser.id,
                firstName: dbUser.first_name,
                lastName: dbUser.last_name,
                username: dbUser.username,
                role: dbUser.role
            });
            const token = cyber_1.default.generateNewToken(loggedInUser);
            response.json({ token });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.default = {
    register,
    login
};
