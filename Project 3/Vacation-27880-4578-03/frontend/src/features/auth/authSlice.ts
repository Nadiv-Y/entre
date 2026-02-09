import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type UserModel from "../../Models/UserModel";
import { jwtDecode } from "jwt-decode";

export interface AuthState {
    token: string;
    user: UserModel | null;
}

const initialState: AuthState = {
    token: localStorage.getItem("token") || "",
    user: null
};

if (initialState.token) {
    try {
        const decodedToken = jwtDecode(initialState.token) as { user: UserModel };
        initialState.user = decodedToken.user;
    } catch {
        initialState.token = "";
        localStorage.removeItem("token");
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        register: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            state.token = token;
            const decodedToken = jwtDecode(token) as { user: UserModel };
            state.user = decodedToken.user;
            localStorage.setItem("token", token);
        },
        loginSuccess: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            state.token = token;
            const decodedToken = jwtDecode(token) as { user: UserModel };
            state.user = decodedToken.user;
            localStorage.setItem("token", token);
        },
        logout: (state) => {
            state.token = "";
            state.user = null;
            localStorage.removeItem("token");
        }
    }
});

export const { register, loginSuccess, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
