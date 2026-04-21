"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const vacations_routes_1 = __importDefault(require("./routes/vacations-routes"));
const route_not_found_1 = __importDefault(require("./middlewares/route-not-found"));
const catch_all_1 = __importDefault(require("./middlewares/catch-all"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const socket_handler_1 = __importDefault(require("./utils/socket-handler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*", // Adjust this in production
        methods: ["GET", "POST"]
    }
});
socket_handler_1.default.init(io);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)());
app.use("/api/vacations/images", express_1.default.static("src/assets/images"));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/vacations", vacations_routes_1.default);
app.use(route_not_found_1.default);
app.use(catch_all_1.default);
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
