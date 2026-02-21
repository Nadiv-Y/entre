import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/AuthService';
import { UserModel } from '../../models/UserModel';

export const Register: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();
    const [authError, setAuthError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit = async (data: UserModel) => {
        try {
            setAuthError(null);
            await authService.register(data);
            navigate('/'); // Redirect to homepage/vacations after successful registration
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
            <h2>Register an Account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        {...register("first_name", { required: "First name is required" })}
                    />
                    {errors.first_name && <span className="error">{errors.first_name.message}</span>}
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        {...register("last_name", { required: "Last name is required" })}
                    />
                    {errors.last_name && <span className="error">{errors.last_name.message}</span>}
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        {...register("username", { required: "Username is required" })}
                    />
                    {errors.username && <span className="error">{errors.username.message}</span>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 4,
                                message: "Password must be at least 4 characters long"
                            }
                        })}
                    />
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </div>

                {authError && <div className="error auth-error">{authError}</div>}

                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
};
