import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../features/auth/Login";
import { Register } from "../features/auth/Register";
import { VacationsList } from "../features/vacations/VacationsList";
import { ProtectedRoute } from "../Components/auth/ProtectedRoute";
import { AdminRoute } from "../Components/auth/AdminRoute";
import { Reports } from "../features/reports/Reports";
import React from "react";

export function Routing(): React.JSX.Element {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/vacations" element={
                <ProtectedRoute>
                    <VacationsList />
                </ProtectedRoute>
            } />

            <Route path="/admin/reports" element={
                <AdminRoute>
                    <Reports />
                </AdminRoute>
            } />

            {/* Default Route: Redirect to /vacations (which will redirect to /login if not auth) 
                Wait, user said "If user is not logged in and tries any route, redirect to /login."
                ProtectedRoute handles the check. If I redirect to /vacations, protected route kicks in and sends to /login.
                Perfect.
            */}
            <Route path="/" element={<Navigate to="/vacations" />} />

            {/* Catch-all: Redirect to /login directly or /vacations */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}
