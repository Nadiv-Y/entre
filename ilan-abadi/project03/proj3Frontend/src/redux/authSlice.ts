import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../models/UserModel";
import { jwtDecode } from "jwt-decode";

interface AuthState {
    user: UserModel | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null
};

// Hydrate from local storage on load
const savedToken = localStorage.getItem("token");
if (savedToken) {
    try {
        const decoded: any = jwtDecode(savedToken);
        initialState.token = savedToken;
        initialState.user = decoded.user;
    } catch (e) {
        localStorage.removeItem("token");
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            const decoded: any = jwtDecode(token);

            state.token = token;
            state.user = decoded.user;

            localStorage.setItem("token", token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
