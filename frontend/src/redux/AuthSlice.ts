import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { UserModel } from '../models/UserModel';
import { jwtDecode } from 'jwt-decode';

// State interface
export interface AuthState {
    user: UserModel | null;
    token: string | null;
}

// Initial state - check if token exists in session storage
const token = sessionStorage.getItem('token');
let user: UserModel | null = null;

if (token) {
    try {
        const decodedToken: any = jwtDecode(token);
        user = {
            id: decodedToken.id,
            first_name: decodedToken.first_name,
            last_name: decodedToken.last_name,
            username: decodedToken.username,
            role: decodedToken.role,
            token: token
        };
    } catch {
        sessionStorage.removeItem('token');
    }
}

const initialState: AuthState = {
    user,
    token
};

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            const decodedToken: any = jwtDecode(token);

            state.token = token;
            state.user = {
                id: decodedToken.id,
                first_name: decodedToken.first_name,
                last_name: decodedToken.last_name,
                username: decodedToken.username,
                role: decodedToken.role,
                token: token
            };

            sessionStorage.setItem('token', token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            sessionStorage.removeItem('token');
        }
    }
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
