import { Request, Response, NextFunction } from "express";
import VacationModel from "../models/vacation-model";
import db from "../utils/db";
import { saveImage, deleteImage } from "../utils/image-handler";
import { UploadedFile } from "express-fileupload";
import socketHandler from "../utils/socket-handler";

// Helper to get a single vacation for broadcasting
async function getVacationById(id: number, userId: number = 0) {
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
    const vacations = await db.execute(sql, [userId, id]);
    return vacations[0];
}

// Get all vacations with follower count and standard follow indication
async function getAllVacations(request: Request, response: Response, next: NextFunction) {
    try {
        const userId = (request as any).user?.id || 0;

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
        const vacations = await db.execute(sql, [userId]);
        response.json(vacations);
    } catch (err: any) {
        next(err);
    }
}

// Add a new vacation (Admin only)
async function addVacation(request: Request, response: Response, next: NextFunction) {
    try {
        const vacation = new VacationModel(request.body);
        vacation.image = request.files?.image as UploadedFile;

        const error = vacation.validate();
        if (error) {
            response.status(400).send(error);
            return;
        }

        if (vacation.image) {
            vacation.picture = saveImage(vacation.image);
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

        const result = await db.execute(sql, values);
        vacation.id = result.insertId;

        const addedVacation = await getVacationById(vacation.id!);
        socketHandler.emit("vacation-added", addedVacation);

        delete vacation.image;
        response.status(201).json(vacation);
    } catch (err: any) {
        next(err);
    }
}

// Update a vacation (Admin only)
async function updateVacation(request: Request, response: Response, next: NextFunction) {
    try {
        const id = +request.params.id;
        const vacation = new VacationModel(request.body);
        vacation.id = id;
        vacation.image = request.files?.image as UploadedFile;

        const error = vacation.validate();
        if (error) {
            response.status(400).send(error);
            return;
        }

        const oldSql = `SELECT picture FROM vacations WHERE id = ?`;
        const oldVacations = await db.execute(oldSql, [id]);
        if (oldVacations.length === 0) {
            response.status(404).send("Vacation not found");
            return;
        }

        vacation.picture = oldVacations[0].picture;

        if (vacation.image) {
            deleteImage(vacation.picture!);
            vacation.picture = saveImage(vacation.image);
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

        await db.execute(sql, values);

        const updatedVacation = await getVacationById(id);
        socketHandler.emit("vacation-updated", updatedVacation);

        delete vacation.image;
        response.json(vacation);
    } catch (err: any) {
        next(err);
    }
}

// Delete a vacation (Admin only)
async function deleteVacation(request: Request, response: Response, next: NextFunction) {
    try {
        const id = +request.params.id;

        const sqlGet = `SELECT picture FROM vacations WHERE id = ?`;
        const vacations = await db.execute(sqlGet, [id]);

        if (vacations.length === 0) {
            response.status(404).send("Vacation not found");
            return;
        }

        const sqlDelete = `DELETE FROM vacations WHERE id = ?`;
        await db.execute(sqlDelete, [id]);

        const picture = vacations[0].picture;
        if (picture) deleteImage(picture);

        socketHandler.emit("vacation-deleted", id);

        response.sendStatus(204);
    } catch (err: any) {
        next(err);
    }
}

// Follow a vacation
async function followVacation(request: Request, response: Response, next: NextFunction) {
    try {
        const userId = (request as any).user.id;
        const vacationId = +request.params.id;

        const sql = `INSERT IGNORE INTO followers (user_id, vacation_id) VALUES (?, ?)`;
        await db.execute(sql, [userId, vacationId]);

        const updatedVacation = await getVacationById(vacationId);
        socketHandler.emit("vacation-updated", updatedVacation);

        response.status(201).send("Followed successfully");
    } catch (err: any) {
        next(err);
    }
}

// Unfollow a vacation
async function unfollowVacation(request: Request, response: Response, next: NextFunction) {
    try {
        const userId = (request as any).user.id;
        const vacationId = +request.params.id;

        const sql = `DELETE FROM followers WHERE user_id = ? AND vacation_id = ?`;
        await db.execute(sql, [userId, vacationId]);

        const updatedVacation = await getVacationById(vacationId);
        socketHandler.emit("vacation-updated", updatedVacation);

        response.sendStatus(204);
    } catch (err: any) {
        next(err);
    }
}

export default {
    getAllVacations,
    addVacation,
    updateVacation,
    deleteVacation,
    followVacation,
    unfollowVacation
};
