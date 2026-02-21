import axios from 'axios';
import appConfig from '../utils/Config';
import { UserModel } from '../models/UserModel';
import { store } from '../redux/Store';
import { login, logout } from '../redux/AuthSlice';

class AuthService {
    /**
     * Register a new user
     */
    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<{ token: string }>(appConfig.registerUrl, user);
        const token = response.data.token;
        store.dispatch(login(token));
    }

    /**
     * Login an existing user
     */
    public async login(credentials: { username: string, password: string }): Promise<void> {
        const response = await axios.post<{ token: string }>(appConfig.loginUrl, credentials);
        const token = response.data.token;
        store.dispatch(login(token));
    }

    /**
     * Logout user
     */
    public logout(): void {
        store.dispatch(logout());
    }
}

const authService = new AuthService();
export default authService;
