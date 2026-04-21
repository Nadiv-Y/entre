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
const vacation_model_1 = __importDefault(require("../models/vacation-model"));
const db_1 = __importDefault(require("../utils/db"));
const image_handler_1 = require("../utils/image-handler");
const socket_handler_1 = __importDefault(require("../utils/socket-handler"));
// Helper to get a single vacation for broadcasting
function getVacationById(id_1) {
    return __awaiter(this, arguments, void 0, function* (id, userId = 0) {
        const sql = `
        SELECT 
            V.id, V.description, V.destination, V.picture, 
            V.start_date AS startDate, V.end_date AS endDate, V.price,
            CAST(COUNT(F.user_id) AS UNSIGNED) AS followersCount,
            EXISTS(SELECT 1 FROM followers WHERE vacation_id = V.id AND user_id = ?) AS isFollowing
        FROM vacations V
        LEFT JOIN followers F ON V.id = F.vacation_id
        WHERE V.id = ?
        GROUP BY V.id
    `;
        const vacations = yield db_1.default.execute(sql, [userId, id]);
        return vacations[0];
    });
}
// Get all vacations with follower count and standard follow indication
function getAllVacations(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const userId = ((_a = request.user) === null || _a === void 0 ? void 0 : _a.id) || 0;
            const sql = `
            SELECT 
                V.id, V.description, V.destination, V.picture, 
                V.start_date AS startDate, V.end_date AS endDate, V.price,
                CAST(COUNT(F.user_id) AS UNSIGNED) AS followersCount,
                EXISTS(SELECT 1 FROM followers WHERE vacation_id = V.id AND user_id = ?) AS isFollowing
            FROM vacations V
            LEFT JOIN followers F ON V.id = F.vacation_id
            GROUP BY V.id
            ORDER BY startDate ASC
        `;
            const vacations = yield db_1.default.execute(sql, [userId]);
            response.json(vacations);
        }
        catch (err) {
            next(err);
        }
    });
}
// Add a new vacation (Admin only)
function addVacation(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const vacation = new vacation_model_1.default(request.body);
            vacation.image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
            const error = vacation.validate();
            if (error) {
                response.status(400).send(error);
                return;
            }
            if (vacation.image) {
                vacation.picture = (0, image_handler_1.saveImage)(vacation.image);
            }
            const sql = `
            INSERT INTO vacations 
            (description, destination, picture, start_date, end_date, price) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
            const values = [
                vacation.description, vacation.destination, vacation.picture || "",
                vacation.startDate, vacation.endDate, vacation.price
            ];
            const result = yield db_1.default.execute(sql, values);
            vacation.id = result.insertId;
            const addedVacation = yield getVacationById(vacation.id);
            socket_handler_1.default.emit("vacation-added", addedVacation);
            delete vacation.image;
            response.status(201).json(vacation);
        }
        catch (err) {
            next(err);
        }
    });
}
// Update a vacation (Admin only)
function updateVacation(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const id = +request.params.id;
            const vacation = new vacation_model_1.default(request.body);
            vacation.id = id;
            vacation.image = (_a = request.files) === null || _a === void 0 ? void 0 : _a.image;
            const error = vacation.validate();
            if (error) {
                response.status(400).send(error);
                return;
            }
            const oldSql = `SELECT picture FROM vacations WHERE id = ?`;
            const oldVacations = yield db_1.default.execute(oldSql, [id]);
            if (oldVacations.length === 0) {
                response.status(404).send("Vacation not found");
                return;
            }
            vacation.picture = oldVacations[0].picture;
            if (vacation.image) {
                (0, image_handler_1.deleteImage)(vacation.picture);
                vacation.picture = (0, image_handler_1.saveImage)(vacation.image);
            }
            const sql = `
            UPDATE vacations SET 
            description = ?, destination = ?, picture = ?, 
            start_date = ?, end_date = ?, price = ?
            WHERE id = ?
        `;
            const values = [
                vacation.description, vacation.destination, vacation.picture,
                vacation.startDate, vacation.endDate, vacation.price, id
            ];
            yield db_1.default.execute(sql, values);
            const updatedVacation = yield getVacationById(id);
            socket_handler_1.default.emit("vacation-updated", updatedVacation);
            delete vacation.image;
            response.json(vacation);
        }
        catch (err) {
            next(err);
        }
    });
}
// Delete a vacation (Admin only)
function deleteVacation(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = +request.params.id;
            const sqlGet = `SELECT picture FROM vacations WHERE id = ?`;
            const vacations = yield db_1.default.execute(sqlGet, [id]);
            if (vacations.length === 0) {
                response.status(404).send("Vacation not found");
                return;
            }
            const sqlDelete = `DELETE FROM vacations WHERE id = ?`;
            yield db_1.default.execute(sqlDelete, [id]);
            const picture = vacations[0].picture;
            if (picture)
                (0, image_handler_1.deleteImage)(picture);
            socket_handler_1.default.emit("vacation-deleted", id);
            response.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    });
}
// Follow a vacation
function followVacation(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = request.user.id;
            const vacationId = +request.params.id;
            const sql = `INSERT IGNORE INTO followers (user_id, vacation_id) VALUES (?, ?)`;
            yield db_1.default.execute(sql, [userId, vacationId]);
            const updatedVacation = yield getVacationById(vacationId);
            socket_handler_1.default.emit("vacation-updated", updatedVacation);
            response.status(201).send("Followed successfully");
        }
        catch (err) {
            next(err);
        }
    });
}
// Unfollow a vacation
function unfollowVacation(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = request.user.id;
            const vacationId = +request.params.id;
            const sql = `DELETE FROM followers WHERE user_id = ? AND vacation_id = ?`;
            yield db_1.default.execute(sql, [userId, vacationId]);
            const updatedVacation = yield getVacationById(vacationId);
            socket_handler_1.default.emit("vacation-updated", updatedVacation);
            response.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.default = {
    getAllVacations,
    addVacation,
    updateVacation,
    deleteVacation,
    followVacation,
    unfollowVacation
};
