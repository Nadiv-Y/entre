import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authController from "./controllers/auth-controller";
import vacationsController from "./controllers/vacations-controller";
import reportsController from "./controllers/reports-controller";

import fileUpload from "express-fileupload";
import { createServer } from "http";
import socketService from "./utils/socket-service";
import path from "path";

const server = express();
const httpServer = createServer(server);

// Initialize Socket.IO
socketService.init(httpServer);

server.use(cors());
server.use(express.json());
server.use(fileUpload());
server.use("/upload", express.static(path.join(process.cwd(), "upload"))); // Serve images

server.use("/api/auth", authController);
server.use("/api/vacations", vacationsController);
server.use("/api/reports", reportsController);

const port = process.env.PORT || 3001;

httpServer.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
    console.log("Waiting for Database connections...");
});
