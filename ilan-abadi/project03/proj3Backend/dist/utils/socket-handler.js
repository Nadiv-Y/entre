"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SocketHandler {
    init(io) {
        this.io = io;
    }
    emit(event, data) {
        if (this.io) {
            this.io.emit(event, data);
        }
    }
}
const socketHandler = new SocketHandler();
exports.default = socketHandler;
