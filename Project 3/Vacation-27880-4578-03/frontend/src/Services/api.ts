import axios from "axios";
import appConfig from "../Utils/Config";
import { store } from "../app/store";
import { logout } from "../features/auth/authSlice";

const api = axios.create({
    baseURL: appConfig.apiUrl
});

// Request interceptor to add token
api.interceptors.request.use(config => {
    // Determine token: prefer store, fallback to localStorage if store empty (e.g. initial load before hydrate)
    // Actually authSlice initializes from localStorage so store should have it.
    const token = store.getState().auth.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to handle 401
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // If 401 (Unauthorized), user session is invalid.
            store.dispatch(logout());
            // ProtectedRoute will verify 'user' is null and redirect to login.
        }
        return Promise.reject(error);
    }
);

export default api;
