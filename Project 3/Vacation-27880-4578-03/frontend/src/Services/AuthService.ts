import api from "./api";
import type UserModel from "../Models/UserModel";
import type CredentialsModel from "../Models/CredentialsModel";
import { store } from "../app/store";
import { loginSuccess, logout, register } from "../features/auth/authSlice";

class AuthService {
    public async register(user: UserModel): Promise<void> {
        const response = await api.post<string>("/auth/register", user);
        const token = response.data;
        store.dispatch(register(token));
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await api.post<string>("/auth/login", credentials);
        const token = response.data;
        store.dispatch(loginSuccess(token));
    }

    public logout(): void {
        store.dispatch(logout());
    }
}

const authService = new AuthService();
export default authService;
