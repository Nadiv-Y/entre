import { io, Socket } from "socket.io-client";
import type { Vacation } from "../models/vacation";

class SocketService {
    private socket: Socket;

    constructor() {
        this.socket = io("http://localhost:3001");
    }

    public connect() {
        if (!this.socket.connected) {
            this.socket.connect();
        }
    }

    public listen(
        onAdd: (vacation: Vacation) => void,
        onUpdate: (vacation: Vacation) => void,
        onDelete: (id: number) => void
    ) {
        // Remove previous listeners to prevent duplicates
        this.socket.off("admin-add-vacation");
        this.socket.off("admin-update-vacation");
        this.socket.off("admin-delete-vacation");

        this.socket.on("admin-add-vacation", onAdd);
        this.socket.on("admin-update-vacation", onUpdate);
        this.socket.on("admin-delete-vacation", onDelete);
    }

    public stopListening() {
        this.socket.off("admin-add-vacation");
        this.socket.off("admin-update-vacation");
        this.socket.off("admin-delete-vacation");
    }

    public disconnect() {
        this.socket.disconnect();
    }
}

const socketService = new SocketService();
export default socketService;
