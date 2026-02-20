import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { logout } from "../redux/authSlice";

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((s: RootState) => s.auth.user);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/vacations">✈️ VacationApp</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white-50">
                    Hello, <strong className="text-white">{user.username}</strong>
                  </span>
                </li>

                {user.is_admin && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin">🛠️ Manage</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/reports">📊 Reports</Link>
                    </li>
                  </>
                )}

                {!user.is_admin && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/vacations">🌍 Vacations</Link>
                  </li>
                )}

                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
