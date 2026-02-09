"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
require("./db"); // Initialize DB connection
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('Appointments Project Backend API');
});
// Error handling (must be last middleware)
app.use(error_handler_1.default);
// Start server
app.listen(config_1.default.server.port, () => {
    console.log(`Server is running on http://localhost:${config_1.default.server.port}`);
});
