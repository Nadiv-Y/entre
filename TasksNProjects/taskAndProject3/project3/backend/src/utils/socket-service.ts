import { Server as SocketIoServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";

let io: SocketIoServer;

const init = (httpServer: HttpServer) => {
    io = new SocketIoServer(httpServer, {
        cors: {
            origin: "*", // allow any origin for now
        }
    });

    io.on("connection", (socket: Socket) => {
        console.log("New client connected");
    });
};

const emitAddVacation = (vacation: any) => {
    io.emit("admin-add-vacation", vacation);
};

const emitUpdateVacation = (vacation: any) => {
    io.emit("admin-update-vacation", vacation);
};

const emitDeleteVacation = (id: number) => {
    io.emit("admin-delete-vacation", id);
};

export default {
    init,
    emitAddVacation,
    emitUpdateVacation,
    emitDeleteVacation
};
