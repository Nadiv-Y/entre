import express, { Request, Response, NextFunction } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";
import vacationsService from "../services/vacations-service";
import socketService from "../utils/socket-service";
import { verifyToken } from "../middleware/auth-middleware";
import { verifyAdmin } from "../middleware/admin-middleware";
import { Vacation } from "../models/vacation";

const router = express.Router();

// Get all vacations (Protected)
router.get("/", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = (request as any).user;
        const vacations = await vacationsService.getAllVacations(user.userId);
        response.json(vacations);
    } catch (err: any) {
        next(err);
    }
});

// Follow
router.post("/follows/:vacationId", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = (request as any).user;
        const vacationId = +request.params.vacationId;
        await vacationsService.follow(user.userId, vacationId);
        response.status(201).send("Followed");
    } catch (err: any) {
        next(err);
    }
});

// Unfollow
router.delete("/follows/:vacationId", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = (request as any).user;
        const vacationId = +request.params.vacationId;
        await vacationsService.unfollow(user.userId, vacationId);
        response.status(204).send(); // No Content
    } catch (err: any) {
        next(err);
    }
});

// --- Admin Routes ---

// Add Vacation
router.post("/", verifyToken, verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacation = request.body as Vacation;

        // Handle Image
        if (request.files && request.files.image) {
            const image = request.files.image as UploadedFile;
            // Generate unique name
            const extension = path.extname(image.name);
            const imageName = `${Date.now()}${extension}`;
            await image.mv(path.join(process.cwd(), "upload", imageName));
            vacation.imageFilename = imageName;
        }

        const addedVacation = await vacationsService.addVacation(vacation);

        // Real-time update
        socketService.emitAddVacation(addedVacation);

        response.status(201).json(addedVacation);
    } catch (err: any) {
        next(err);
    }
});

// Update Vacation
router.put("/:id", verifyToken, verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.id;
        const vacation = request.body as Vacation;
        vacation.vacationId = vacationId;

        // Handle Image
        if (request.files && request.files.image) {
            const image = request.files.image as UploadedFile;
            const extension = path.extname(image.name);
            const imageName = `${Date.now()}${extension}`;
            await image.mv(path.join(process.cwd(), "upload", imageName));
            vacation.imageFilename = imageName;
        }

        // Note: If no new image, vacation.imageFilename might be undefined.
        // The service needs to handle this or the client sends the old filename.
        // For simplicity, we assume client sends old filename if no new image, or we handle partial update.
        // But for this exercise, we'll assume the client sends all data.

        const updatedVacation = await vacationsService.updateVacation(vacation);
        socketService.emitUpdateVacation(updatedVacation);
        response.json(updatedVacation);
    } catch (err: any) {
        next(err);
    }
});

// Delete Vacation
router.delete("/:id", verifyToken, verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.id;
        await vacationsService.deleteVacation(vacationId);
        socketService.emitDeleteVacation(vacationId);
        response.status(204).send();
    } catch (err: any) {
        next(err);
    }
});

export default router;
