import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Vacations from "./pages/Vacations";
import Admin from "./pages/Admin";
import Reports from "./pages/Reports";
import "bootstrap/dist/css/bootstrap.min.css";

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const token = useSelector((s: RootState) => s.auth.token);
  return token ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }: { children: React.ReactElement }) {
  const user = useSelector((s: RootState) => s.auth.user);
  return user?.is_admin ? children : <Navigate to="/vacations" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/vacations" element={
          <PrivateRoute><Vacations /></PrivateRoute>
        } />

        <Route path="/admin" element={
          <PrivateRoute><AdminRoute><Admin /></AdminRoute></PrivateRoute>
        } />

        <Route path="/reports" element={
          <PrivateRoute><AdminRoute><Reports /></AdminRoute></PrivateRoute>
        } />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/vacations" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
