import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verify-admin";
import vacationsLogic from "../5-logic/vacations-logic";
import Vacation from "../4-models/Vacation";
import cyber from "../2-utils/cyber";
import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "..", "..", "upload")); // Root upload folder
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, uuid() + extension);
    }
});
const upload = multer({ storage });

// GET /api/vacations - Get all (with followers info)
router.get("/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.header("authorization");
        const token = authHeader?.substring(7) || "";
        const user = cyber.getUserFromToken(token);

        const vacations = await vacationsLogic.getAllVacations(user!.id);
        response.json(vacations);
    }
    catch (err) {
        next(err);
    }
});

// GET /api/admin/reports/followers - Get report data (Admin)
router.get("/admin/reports/followers", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const report = await vacationsLogic.getVacationsReport();
        response.json(report);
    }
    catch (err) {
        next(err);
    }
});

// POST /api/admin/vacations - Add Vacation (Admin)
router.post("/admin/vacations", verifyAdmin, upload.single("image"), async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.file; // Multer puts file here
        request.body.imageName = request.file?.filename;

        const vacation = new Vacation(request.body);
        const addedVacation = await vacationsLogic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err) {
        next(err);
    }
});

// PUT /api/admin/vacations/:id - Update Vacation (Admin)
router.put("/admin/vacations/:id", verifyAdmin, upload.single("image"), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.id = id;
        request.body.image = request.file;
        if (request.file) {
            request.body.imageName = request.file.filename;
        }

        const vacation = new Vacation(request.body);
        const updatedVacation = await vacationsLogic.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err) {
        next(err);
    }
});

// DELETE /api/admin/vacations/:id - Delete Vacation (Admin)
router.delete("/admin/vacations/:id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await vacationsLogic.deleteVacation(id);
        response.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});

export default router;
