import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";
import vacationRoutes from "./routes/vacations.routes.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use(
  "/upload",
  express.static(path.join(__dirname, "..", "..", "upload"))
);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vacations", vacationRoutes);

export default app;
