import http from "http";
import app from "./app.js";
import { initSocket } from "./socket.js";


const PORT = process.env.PORT || 4000;

const httpServer = http.createServer(app);
initSocket(httpServer); // Must be called before routes need getIo()

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
