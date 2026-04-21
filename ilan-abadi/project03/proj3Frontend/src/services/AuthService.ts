import api from "./api";
import { UserModel } from "../models/UserModel";
import { CredentialsModel } from "../models/CredentialsModel";

class AuthService {

    public async register(user: UserModel): Promise<string> {
        const response = await api.post<{ token: string }>("/api/auth/register", user);
        return response.data.token;
    }

    public async login(credentials: CredentialsModel): Promise<string> {
        const response = await api.post<{ token: string }>("/api/auth/login", credentials);
        return response.data.token;
    }
}

const authService = new AuthService();
export default authService;
