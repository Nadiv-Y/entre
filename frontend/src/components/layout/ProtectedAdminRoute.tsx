import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/Store';

interface ProtectedAdminRouteProps {
    children: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== 'Admin') {
        return <Navigate to="/vacations" />; // Redirect normal users away from admin routes
    }

    return <>{children}</>;
};
