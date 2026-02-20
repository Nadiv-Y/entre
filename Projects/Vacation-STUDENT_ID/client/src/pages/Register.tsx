import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCredentials } from "../redux/authSlice";
import { AppDispatch } from "../redux/store";
import api from "../services/api";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form, setForm] = useState({ first_name: "", last_name: "", username: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/register", form);
      dispatch(setCredentials(res.data));
      navigate("/vacations");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: 420 }}>
        <h2 className="card-title text-center mb-4">✈️ Vacation App</h2>
        <h5 className="text-center text-muted mb-3">Create Account</h5>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          {[
            { label: "First Name", name: "first_name" },
            { label: "Last Name", name: "last_name" },
            { label: "Username", name: "username" },
            { label: "Password", name: "password", type: "password" },
          ].map(field => (
            <div className="mb-3" key={field.name}>
              <label className="form-label">{field.label}</label>
              <input
                type={field.type || "text"}
                name={field.name}
                className="form-control"
                value={(form as any)[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
