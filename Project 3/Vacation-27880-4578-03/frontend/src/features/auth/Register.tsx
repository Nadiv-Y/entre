import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type UserModel from "../../Models/UserModel";
import authService from "../../Services/AuthService";
import notify from "../../Utils/Notify";
import { Box, Button, Container, TextField, Typography, Paper, Alert } from "@mui/material";
import React, { useState } from "react";

export function Register(): React.JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");

    async function submit(user: UserModel) {
        try {
            await authService.register(user);
            // Service dispatches 'register' action which saves token and user.
            setError("");
            navigate("/vacations");
        } catch (err: unknown) {
            notify.error(err);
        }
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>

                {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit(submit)} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        {...register("firstName", { required: "First name is required" })}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        {...register("lastName", { required: "Last name is required" })}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoComplete="username"
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
                        autoComplete="new-password"
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
                        Sign Up
                    </Button>
                    <Link to="/login" style={{ textDecoration: 'none', fontSize: '0.875rem' }}>
                        {"Already have an account? Sign In"}
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
}
