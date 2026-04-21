import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import authReducer from "./authSlice";
import vacationReducer from "./vacationSlice";

// Create the store
export const store = configureStore({
    reducer: {
        auth: authReducer,
        vacations: vacationReducer
    }
});

// Create types for AppDispatch and RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
