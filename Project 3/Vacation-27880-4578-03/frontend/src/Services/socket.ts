import { io, Socket } from "socket.io-client";
import appConfig from "../Utils/Config";
import { store } from "../app/store";
import { vacationAdded, vacationUpdated, vacationDeleted } from "../features/vacations/vacationsSlice";
import type VacationModel from "../Models/VacationModel";

let socket: Socket | undefined;

function connect(token: string) {
    if (!socket) {
        socket = io(appConfig.serverUrl, {
            auth: { token } // Pass token for handshake (if backend verifies it)
        });

        socket.on("add-vacation", (vacation: VacationModel) => {
            store.dispatch(vacationAdded(vacation));
        });

        socket.on("update-vacation", (vacation: VacationModel) => {
            store.dispatch(vacationUpdated(vacation));
        });

        socket.on("delete-vacation", (id: number) => {
            store.dispatch(vacationDeleted(id));
        });
    }
}

function disconnect() {
    if (socket) {
        socket.disconnect();
        socket = undefined;
    }
}

export const socketService = {
    connect,
    disconnect
};
