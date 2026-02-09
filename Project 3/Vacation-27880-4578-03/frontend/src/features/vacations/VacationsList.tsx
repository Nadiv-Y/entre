import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { store } from "../../app/store";
import vacationsService from "../../Services/VacationsService";
import { socketService } from "../../Services/socket";
import { VacationCard } from "./VacationCard";
import { VacationModal } from "./VacationModal";
import { Box, Pagination, Typography, Container, CircularProgress, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import type VacationModel from "../../Models/VacationModel";
import React from "react";

export function VacationsList(): React.JSX.Element {
    const vacations = useAppSelector(state => state.vacations.vacations);
    const user = useAppSelector(state => state.auth.user);
    const isAdmin = user?.role === "admin";

    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const [loading, setLoading] = useState(true);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [vacationToEdit, setVacationToEdit] = useState<VacationModel | undefined>(undefined);

    useEffect(() => {
        // Fetch data
        vacationsService.getAllVacations()
            .then(() => setLoading(false))
            .catch(() => {
                // if 401 interceptor handles it
                setLoading(false);
            });

        // Connect socket
        const token = store.getState().auth.token;
        if (token) {
            socketService.connect(token);
        }

        return () => {
            socketService.disconnect();
        }
    }, []);

    // Sorting
    const sortedVacations = [...vacations].sort((a, b) => {
        const aFollow = a.isFollowing ? 1 : 0;
        const bFollow = b.isFollowing ? 1 : 0;
        if (aFollow !== bFollow) {
            return bFollow - aFollow;
        }
        return new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime();
    });

    // Pagination
    const count = Math.ceil(sortedVacations.length / itemsPerPage);
    const displayedVacations = sortedVacations.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    function handlePageChange(_event: React.ChangeEvent<unknown>, value: number) {
        setPage(value);
        window.scrollTo(0, 0);
    }

    function handleAdd() {
        setVacationToEdit(undefined);
        setIsModalOpen(true);
    }

    function handleEdit(vacation: VacationModel) {
        setVacationToEdit(vacation);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setVacationToEdit(undefined);
    }

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;

    return (
        <Container sx={{ mt: 4 }}>
            {isAdmin && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                    <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
                        Add Vacation
                    </Button>
                </Box>
            )}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {displayedVacations.map(v => (
                    <VacationCard
                        key={v.id}
                        vacation={v}
                        onEdit={handleEdit}
                    />
                ))}
            </Box>

            {count > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <Pagination count={count} page={page} onChange={handlePageChange} color="primary" />
                </Box>
            )}

            {displayedVacations.length === 0 && !loading && <Typography align="center">No vacations found.</Typography>}

            {isAdmin && (
                <VacationModal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    vacationToEdit={vacationToEdit}
                />
            )}
        </Container>
    );
}
