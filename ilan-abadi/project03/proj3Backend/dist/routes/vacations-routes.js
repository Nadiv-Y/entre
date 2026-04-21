"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vacations_controller_1 = __importDefault(require("../controllers/vacations-controller"));
const verify_logged_in_1 = __importDefault(require("../middlewares/verify-logged-in"));
const verify_admin_1 = __importDefault(require("../middlewares/verify-admin"));
const router = express_1.default.Router();
// User routes (requires login)
router.get("/", verify_logged_in_1.default, vacations_controller_1.default.getAllVacations);
router.post("/:id/follow", verify_logged_in_1.default, vacations_controller_1.default.followVacation);
router.delete("/:id/follow", verify_logged_in_1.default, vacations_controller_1.default.unfollowVacation);
// Admin routes (requires admin)
router.post("/", verify_admin_1.default, vacations_controller_1.default.addVacation);
router.put("/:id", verify_admin_1.default, vacations_controller_1.default.updateVacation);
router.delete("/:id", verify_admin_1.default, vacations_controller_1.default.deleteVacation);
exports.default = router;
