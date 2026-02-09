import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type CredentialsModel from "../../Models/CredentialsModel";
import authService from "../../Services/AuthService";
import { Box, Button, Container, TextField, Typography, Paper, Alert } from "@mui/material";
import { useState } from "react";

export function Login(): React.JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");

    async function submit(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            setError("");
            navigate("/vacations");
        } catch (err: unknown) {
            if (err && typeof err === 'object' && 'response' in err) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const response = (err as any).response;
                setError(response?.data || "Invalid username or password");
            } else {
                setError("An unexpected error occurred.");
            }
        }
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit(submit)} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoComplete="username"
                        autoFocus
                        {...register("username", { required: "Username is required", minLength: { value: 2, message: "Min length is 2" } })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register("password", { required: "Password is required", minLength: { value: 4, message: "Min length is 4" } })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Link to="/register" style={{ textDecoration: 'none', fontSize: '0.875rem' }}>
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
}
