import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth"; // Wrapper for useContext
import "./Layout.css";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="layout">
            <header className="header">
                <div className="container header-content">
                    <NavLink to="/" className="logo">VacationTime</NavLink>
                    <nav className="nav">
                        {!user && (
                            <>
                                <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Login</NavLink>
                                <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Register</NavLink>
                            </>
                        )}
                        {user && (
                            <>
                                <NavLink to="/vacations" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Vacations</NavLink>
                                {user.role === "Admin" && (
                                    <NavLink to="/reports" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Reports</NavLink>
                                )}
                                <span className="user-name">Hello, {user.firstName}</span>
                                <button onClick={handleLogout} className="btn btn-outline">Logout</button>
                            </>
                        )}
                    </nav>
                </div>
            </header>
            <main className="main container">
                {children}
            </main>
            <footer className="footer">
                <div className="container">
                    &copy; 2024 VacationTime. All rights reserved.
                </div>
            </footer>
        </div>
    );
};
