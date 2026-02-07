import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import VacationsList from "./components/Vacations/VacationsList";
import Reports from "./components/Reports/Reports";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/vacations" element={
          <ProtectedRoute>
            <VacationsList />
          </ProtectedRoute>
        } />

        <Route path="/reports" element={
          <ProtectedRoute adminOnly>
            <Reports />
          </ProtectedRoute>
        } />

        <Route path="/" element={<Navigate to="/vacations" />} />
      </Routes>
    </Layout>
  );
}

export default App;
