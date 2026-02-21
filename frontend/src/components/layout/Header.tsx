import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/Store';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/AuthService';
import { Compass, Home, Plus, BarChart3, LogOut } from 'lucide-react';

export const Header: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <header className="app-header">
            <div className="logo">
                <Compass size={32} color="var(--primary-color)" className="spin-icon" />
                <h1>Tag-a-Voyage</h1>
            </div>

            <div className="user-controls">
                {user ? (
                    <>
                        <span className="welcome-text">
                            Welcome, {user.first_name} {user.last_name}
                            {user.role === 'Admin' && <span className="admin-badge"> (Admin)</span>}
                        </span>
                        <button className="header-icon-btn nav-btn" onClick={() => navigate('/vacations')} title="Home">
                            <Home size={18} /> <span>Home</span>
                        </button>
                        {user.role === 'Admin' && (
                            <>
                                <button className="header-icon-btn nav-btn" onClick={() => navigate('/reports')} title="Reports">
                                    <BarChart3 size={18} /> <span>Reports</span>
                                </button>
                                <button className="header-icon-btn nav-btn primary-hollow" onClick={() => navigate('/vacations/add')} title="Add Vacation">
                                    <Plus size={18} /> <span>Add</span>
                                </button>
                            </>
                        )}
                        <button onClick={handleLogout} className="header-icon-btn logout-icon-btn" title="Logout">
                            <LogOut size={18} /> <span>Logout</span>
                        </button>
                    </>
                ) : (
                    <span className="guest-text">Welcome, Guest</span>
                )}
            </div>
        </header>
    );
};
