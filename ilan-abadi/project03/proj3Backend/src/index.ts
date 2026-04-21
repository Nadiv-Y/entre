import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth-routes";
import vacationsRoutes from "./routes/vacations-routes";
import routeNotFound from "./middlewares/route-not-found";
import catchAll from "./middlewares/catch-all";
import fileUpload from "express-fileupload";
import socketHandler from "./utils/socket-handler";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*", // Adjust this in production
        methods: ["GET", "POST"]
    }
});

socketHandler.init(io);

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/api/vacations/images", express.static("src/assets/images"));

app.use("/api/auth", authRoutes);
app.use("/api/vacations", vacationsRoutes);
app.use(routeNotFound);
app.use(catchAll);

// Socket.io connection handler
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
