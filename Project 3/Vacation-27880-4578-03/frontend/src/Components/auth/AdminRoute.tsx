import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import React from "react";

interface AdminRouteProps {
    children: React.JSX.Element;
}

export function AdminRoute({ children }: AdminRouteProps): React.JSX.Element {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user || user.role !== "admin") {
        return <Navigate to="/vacations" replace />; // Or /login if not logged in, but ProtectedRoute should handle that
    }

    return children;
}
