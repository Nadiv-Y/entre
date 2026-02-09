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
const promise_1 = __importDefault(require("mysql2/promise"));
const config_1 = __importDefault(require("./config"));
const pool = promise_1.default.createPool({
    host: config_1.default.db.host,
    user: config_1.default.db.user,
    password: config_1.default.db.password,
    database: config_1.default.db.database,
    port: config_1.default.db.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// Test connection
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield pool.getConnection();
        console.log('Successfully connected to the database!');
        connection.release();
    }
    catch (error) {
        console.error('Error connecting to database:', error);
    }
});
testConnection();
exports.default = pool;
