import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { User } from "../../models/user";
import { useAuth } from "../../context/useAuth";
import "./Auth.css";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const { register: registerUser } = useAuth(); // Context function
    const navigate = useNavigate();

    const onSubmit = async (data: User) => {
        try {
            await registerUser(data);
            navigate("/vacations");
        } catch (err: any) {
            alert(err.response?.data || "Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <form className="card auth-form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Register</h2>

                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" {...register("firstName", { required: "First name is required" })} />
                    {errors.firstName && <span className="error">{errors.firstName.message}</span>}
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" {...register("lastName", { required: "Last name is required" })} />
                    {errors.lastName && <span className="error">{errors.lastName.message}</span>}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" {...register("email", { required: "Email is required" })} />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" {...register("password", { required: "Password is required", minLength: { value: 4, message: "Min 4 chars" } })} />
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </div>

                <button className="btn btn-primary" type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
