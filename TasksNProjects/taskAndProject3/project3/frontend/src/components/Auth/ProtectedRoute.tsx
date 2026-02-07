import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a nice spinner
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && user.role !== "Admin") {
        return <Navigate to="/vacations" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
