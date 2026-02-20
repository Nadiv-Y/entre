import { Server } from "socket.io";

let io;

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: { origin: "*" },
  });
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
  });
  return io;
}

export function getIo() {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}
