import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import React from "react";

interface ProtectedRouteProps {
    children: React.JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps): React.JSX.Element {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
