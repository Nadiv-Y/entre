import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { Credentials } from "../../models/user";
import { useAuth } from "../../context/useAuth";
import "./Auth.css";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Credentials>();
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data: Credentials) => {
        try {
            await login(data);
            navigate("/vacations");
        } catch (err: any) {
            alert(err.response?.data || "Login failed");
        }
    };

    return (
        <div className="auth-container">
            <form className="card auth-form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Login</h2>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" {...register("email", { required: "Email is required" })} />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" {...register("password", { required: "Password is required" })} />
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </div>

                <button className="btn btn-primary" type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
