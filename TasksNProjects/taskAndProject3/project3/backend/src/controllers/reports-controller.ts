import express, { Request, Response, NextFunction } from "express";
import reportsService from "../services/reports-service";
import { verifyToken } from "../middleware/auth-middleware";
import { verifyAdmin } from "../middleware/admin-middleware";

const router = express.Router();

router.get("/followers", verifyToken, verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const stats = await reportsService.getFollowersStats();
        response.json(stats);
    } catch (err: any) {
        next(err);
    }
});

export default router;
