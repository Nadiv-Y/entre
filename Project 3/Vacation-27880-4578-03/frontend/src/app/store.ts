import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { vacationReducer } from "../features/vacations/vacationsSlice";
import { reportsReducer } from "../features/reports/reportsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        vacations: vacationReducer,
        reports: reportsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
