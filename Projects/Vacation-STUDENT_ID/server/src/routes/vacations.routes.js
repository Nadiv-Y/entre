import { Router } from "express";
import { verifyToken, adminOnly } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import {
  getAllVacations,
  getReport,
  createVacation,
  updateVacation,
  deleteVacation,
} from "../controllers/vacations.controller.js";
import { followVacation, unfollowVacation } from "../controllers/followers.controller.js";

const router = Router();

// All routes require auth
router.use(verifyToken);

router.get("/",            getAllVacations);
router.get("/report",      adminOnly, getReport);

router.post("/",           adminOnly, upload.single("image"), createVacation);
router.put("/:id",         adminOnly, upload.single("image"), updateVacation);
router.delete("/:id",      adminOnly, deleteVacation);

// Follow / Unfollow (regular users only — adminOnly guard is inside controller)
router.post("/:id/follow",    followVacation);
router.delete("/:id/follow",  unfollowVacation);

export default router;
