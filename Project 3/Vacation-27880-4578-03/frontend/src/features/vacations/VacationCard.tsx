import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Favorite, FavoriteBorder, CalendarMonth, Edit, Delete } from "@mui/icons-material";
import type VacationModel from "../../Models/VacationModel";
import vacationsService from "../../Services/VacationsService";
import appConfig from "../../Utils/Config";
import { useAppSelector } from "../../app/hooks";
import React from "react";

interface VacationCardProps {
    vacation: VacationModel;
    onEdit: (vacation: VacationModel) => void;
}

export function VacationCard({ vacation, onEdit }: VacationCardProps): React.JSX.Element {
    const user = useAppSelector(state => state.auth.user);
    const isAdmin = user?.role === "admin";

    // Format dates
    const fromDate = new Date(vacation.fromDate).toLocaleDateString();
    const toDate = new Date(vacation.toDate).toLocaleDateString();

    async function handleFollow() {
        try {
            if (vacation.isFollowing) {
                await vacationsService.unfollow(vacation.id);
            } else {
                await vacationsService.follow(vacation.id);
            }
        } catch {
            alert("Error updating follow status");
        }
    }

    async function handleDelete() {
        if (window.confirm("Are you sure you want to delete this vacation?")) {
            try {
                await vacationsService.deleteVacation(vacation.id);
            } catch {
                alert("Error deleting vacation");
            }
        }
    }

    // Image URL
    const imageUrl = `${appConfig.serverUrl}/upload/${vacation.imageName}`;

    return (
        <Card sx={{ width: 300, m: 2, display: 'flex', flexDirection: 'column' }}>
            {/* Image */}
            <CardMedia
                component="img"
                height="140"
                image={imageUrl}
                alt={vacation.destination}
            />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {vacation.destination}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                    <CalendarMonth fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">
                        {fromDate} - {toDate}
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    height: 60
                }}>
                    {vacation.description}
                </Typography>

                <Typography variant="h6" color="primary" sx={{ mt: 1, textAlign: 'center', bgcolor: '#f0f0f0', borderRadius: 1 }}>
                    ${Number(vacation.price).toFixed(2)}
                </Typography>
            </CardContent>

            <CardActions sx={{ mt: 'auto', justifyContent: 'space-between' }}>
                {!isAdmin && (
                    <Button
                        size="small"
                        variant={vacation.isFollowing ? "contained" : "outlined"}
                        color="primary"
                        startIcon={vacation.isFollowing ? <Favorite /> : <FavoriteBorder />}
                        onClick={handleFollow}
                    >
                        {vacation.followersCount} Likes
                    </Button>
                )}
                {isAdmin && (
                    <Box sx={{ display: 'flex', gap: 1, width: '100%', justifyContent: 'flex-end' }}>
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Edit />}
                            onClick={() => onEdit(vacation)}
                        >
                            Edit
                        </Button>
                        <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<Delete />}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </Box>
                )}
            </CardActions>
        </Card>
    );
}
