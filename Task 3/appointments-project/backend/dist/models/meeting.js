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
exports.Meeting = void 0;
const db_1 = __importDefault(require("../db"));
class Meeting {
    constructor(teamId, startTime, endTime, description, room, id) {
        this.teamId = teamId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = description;
        this.room = room;
        this.id = id;
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      INSERT INTO meetings (teamId, startTime, endTime, description, room)
      VALUES (?, ?, ?, ?, ?)
    `;
            const values = [this.teamId, this.startTime, this.endTime, this.description, this.room];
            try {
                const [result] = yield db_1.default.execute(query, values);
                this.id = result.insertId;
                return this;
            }
            catch (error) {
                console.error('Error executing meeting insert query:', error);
                throw error;
            }
        });
    }
    static selectByTeamId(teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM meetings WHERE teamId = ? ORDER BY startTime ASC';
            const [rows] = yield db_1.default.execute(query, [teamId]);
            return rows;
        });
    }
}
exports.Meeting = Meeting;
