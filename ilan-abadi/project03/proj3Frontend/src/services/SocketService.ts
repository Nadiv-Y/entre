import { io, Socket } from "socket.io-client";
import { addVacation, updateVacation, deleteVacation, setLastUpdated } from "../redux/vacationSlice";
import { VacationModel } from "../models/VacationModel";
import { store, type AppDispatch } from "../redux/store";

class SocketService {
    private socket: Socket;

    public connect(dispatch: AppDispatch): void {
        this.socket = io("http://localhost:3001");

        this.socket.on("vacation-added", (vacation: VacationModel) => {
            dispatch(addVacation(vacation));
            this.highlight(dispatch, vacation.id!);
        });

        this.socket.on("vacation-updated", (vacation: VacationModel) => {
            const currentState = store.getState().vacations.vacations;
            const existing = currentState.find(v => v.id === vacation.id);
            if (existing) {
                vacation.isFollowing = existing.isFollowing;
            }
            dispatch(updateVacation(vacation));
            this.highlight(dispatch, vacation.id!);
        });

        this.socket.on("vacation-deleted", (id: number) => {
            dispatch(deleteVacation(id));
        });
    }

    private highlight(dispatch: AppDispatch, id: number): void {
        dispatch(setLastUpdated(id));
        setTimeout(() => {
            dispatch(setLastUpdated(null));
        }, 2000);
    }

    public disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

const socketService = new SocketService();
export default socketService;
