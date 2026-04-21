import express from "express";
import vacationsController from "../controllers/vacations-controller";
import verifyLoggedIn from "../middlewares/verify-logged-in";
import verifyAdmin from "../middlewares/verify-admin";

const router = express.Router();

// User routes (requires login)
router.get("/", verifyLoggedIn, vacationsController.getAllVacations);
router.post("/:id/follow", verifyLoggedIn, vacationsController.followVacation);
router.delete("/:id/follow", verifyLoggedIn, vacationsController.unfollowVacation);

// Admin routes (requires admin)
router.post("/", verifyAdmin, vacationsController.addVacation);
router.put("/:id", verifyAdmin, vacationsController.updateVacation);
router.delete("/:id", verifyAdmin, vacationsController.deleteVacation);

export default router;
