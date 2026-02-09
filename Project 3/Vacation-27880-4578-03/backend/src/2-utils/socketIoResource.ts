import { Server } from "socket.io";
import server from "../app";

let socketIoServer: Server;

function init(httpServer: any) {
    socketIoServer = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    });

    socketIoServer.on("connection", (socket) => {
        console.log("Client connected");
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
}

function emitAddVacation(vacation: any) {
    socketIoServer?.emit("add-vacation", vacation);
}

function emitUpdateVacation(vacation: any) {
    socketIoServer?.emit("update-vacation", vacation);
}

function emitDeleteVacation(id: number) {
    socketIoServer?.emit("delete-vacation", id);
}

export default {
    init,
    emitAddVacation,
    emitUpdateVacation,
    emitDeleteVacation
};
