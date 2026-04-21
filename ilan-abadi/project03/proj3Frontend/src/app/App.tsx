import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
import Login from "../components/Login";
import Registration from "../components/Registration";
import UserPage from "../components/UserPage";
import AdminPage from "../components/AdminPage";
import AddVac from "../components/AddVac";
import VacFollowReport from "../components/VacFollowReport";
import { useAppDispatch, useAppSelector } from "../redux/store";
import socketService from "../services/SocketService";

function App() {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user) {
            socketService.connect(dispatch);
        } else {
            socketService.disconnect();
        }
        return () => {
            socketService.disconnect();
        };
    }, [user, dispatch]);

    return (
        <div className="App page-container-green text-center">
            <div className="mt-3 mx-auto text-center">
                <div className='d-flex align-items-center justify-content-center'>
                    <img src="../src/assets/tagntravel_logo.png" alt="logo" className='logo ps-3' />
                    <h1 className="display-2 me-3">Tag'n'Travel</h1>
                </div>
            </div>
            <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" replace />} />
                <Route path="/register" element={!user ? <Registration /> : <Navigate to="/home" replace />} />

                {/* Dashboard / Home */}
                <Route path="/home" element={
                    !user ? <Navigate to="/login" replace /> :
                        user.role === "Admin" ? <AdminPage /> : <UserPage />
                } />

                {/* Admin Specific Routes */}
                <Route path="/admin/add" element={user?.role === "Admin" ? <AddVac /> : <Navigate to="/login" replace />} />
                <Route path="/admin/edit/:id" element={user?.role === "Admin" ? <AddVac /> : <Navigate to="/login" replace />} />
                <Route path="/admin/report" element={user?.role === "Admin" ? <VacFollowReport /> : <Navigate to="/login" replace />} />

                {/* Default Route */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </div>
    );
}

export default App;
