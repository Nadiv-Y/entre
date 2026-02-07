import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, Credentials } from "../models/user";
import { Role } from "../models/user";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (credentials: Credentials) => Promise<void>;
    register: (user: User) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Load token from local storage on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                const userData = decoded.user;
                userData.token = token;
                setUser(userData);
            } catch (err) {
                console.error("Invalid token");
                logout();
            }
        }
        setLoading(false);
    }, []);

    const register = async (user: User) => {
        const response = await api.post<string>("/auth/register", user);
        const token = response.data;
        saveToken(token);
    };

    const login = async (credentials: Credentials) => {
        const response = await api.post<string>("/auth/login", credentials);
        const token = response.data;
        saveToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const saveToken = (token: string) => {
        localStorage.setItem("token", token);
        const decoded: any = jwtDecode(token);
        const userData = decoded.user;
        userData.token = token;
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
