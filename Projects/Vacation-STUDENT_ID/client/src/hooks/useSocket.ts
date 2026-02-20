import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { updateVacation } from "../redux/vacationsSlice";
import { AppDispatch } from "../redux/store";

const SOCKET_URL = process.env.REACT_APP_API_URL?.replace("/api", "") || "http://localhost:4000";

// Single socket instance shared across the app
const socket = io(SOCKET_URL, { transports: ["websocket"] });

export function useSocket() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // When admin edits a vacation → update Redux store → card re-renders instantly
    socket.on("vacationUpdated", (vacation) => {
      dispatch(updateVacation(vacation));
    });

    return () => {
      socket.off("vacationUpdated");
    };
  }, [dispatch]);
}
