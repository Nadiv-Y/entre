import { Layout } from './components/layout/Layout';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { VacationsList } from './components/vacations/VacationsList';
import { AddEditVacation } from './components/vacations/AddEditVacation';
import { ProtectedAdminRoute } from './components/layout/ProtectedAdminRoute';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AdminReport } from './components/vacations/AdminReport';
import { Navigate, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/vacations" element={<ProtectedRoute><VacationsList /></ProtectedRoute>} />

        {/* Protected Admin Routes */}
        <Route path="/vacations/add" element={<ProtectedAdminRoute><AddEditVacation /></ProtectedAdminRoute>} />
        <Route path="/vacations/edit/:id" element={<ProtectedAdminRoute><AddEditVacation /></ProtectedAdminRoute>} />
        <Route path="/reports" element={<ProtectedAdminRoute><AdminReport /></ProtectedAdminRoute>} />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/vacations" />} />
        <Route path="*" element={<Navigate to="/vacations" />} />
      </Routes>
    </Layout>
  )
}

export default App;
