import { Server } from "socket.io";

class SocketHandler {
    private io!: Server;

    public init(io: Server): void {
        this.io = io;
    }

    public emit(event: string, data: any): void {
        if (this.io) {
            this.io.emit(event, data);
        }
    }
}

const socketHandler = new SocketHandler();
export default socketHandler;
