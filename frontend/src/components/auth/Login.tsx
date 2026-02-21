import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/AuthService';

export const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [authError, setAuthError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
            setAuthError(null);
            await authService.login({ username: data.username, password: data.password });
            navigate('/'); // Redirect to homepage/vacations after successful login
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.error) {
                setAuthError(err.response.data.error);
            } else {
                setAuthError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="auth-container">
            <h2>Login to Vacation Tagging</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        {...register("username", { required: "Username is required" })}
                    />
                    {errors.username && <span className="error">{(errors.username as any).message}</span>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && <span className="error">{(errors.password as any).message}</span>}
                </div>

                {authError && <div className="error auth-error">{authError}</div>}

                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
};
