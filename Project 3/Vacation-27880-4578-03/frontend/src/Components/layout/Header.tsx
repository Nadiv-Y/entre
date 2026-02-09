import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import authService from "../../Services/AuthService";
import React from "react";

export function Header(): React.JSX.Element {
    const user = useAppSelector(state => state.auth.user);
    const navigate = useNavigate();

    function handleLogout() {
        authService.logout();
        navigate("/login");
    }

    if (!user) return <></>;

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Vacation Project
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/vacations">Vacations</Button>
                    {user.role === "admin" && (
                        <Button color="inherit" component={Link} to="/admin/reports">Reports</Button>
                    )}
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
