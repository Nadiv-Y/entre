import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import catchAll from "./3-middleware/catch-all";
import authController from "./6-controllers/auth-controller";
import vacationsController from "./6-controllers/vacations-controller";
import followersController from "./6-controllers/followers-controller";

dotenv.config();

const server = express();

// Rate Limiter (Optional but good practice)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});

if (process.env.DISABLE_LIMITER !== "true") {
    server.use(limiter);
} else {
    console.log("Rate limiter disabled via DISABLE_LIMITER=true");
}

// Logger
server.use(morgan("dev"));

// Standard Middleware
server.use(cors()); // Allow frontend
server.use(express.json());

// Static Files (Images)
// Serve 'upload' folder at /assets/images
server.use("/upload", express.static(path.join(__dirname, "..", "..", "upload")));

// Health Check
server.get("/api/health", (req, res) => {
    res.json({ status: "UP", timestamp: new Date() });
});

// Controllers
server.use("/api/auth", authController);
server.use("/api", vacationsController); // Mount at /api so we can have /api/vacations AND /api/admin/vacations in one controller? OR separate?
// Better: vacationsController mounted at /api. Then inside: router.get("/vacations"), router.post("/admin/vacations").
server.use("/api/follows", followersController);

// Central Error Handler
server.use(catchAll);

export default server;
