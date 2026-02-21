import React from 'react';
import { VacationModel } from '../../models/VacationModel';
import appConfig from '../../utils/Config';
import vacationsService from '../../services/VacationsService';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/Store';
import { useNavigate } from 'react-router-dom';
import { Calendar, Heart } from 'lucide-react';

interface VacationCardProps {
    vacation: VacationModel;
    onFollowToggle: () => void;
}

export const VacationCard: React.FC<VacationCardProps> = ({ vacation, onFollowToggle }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const isAdmin = user?.role === 'Admin';
    const navigate = useNavigate();

    const handleFollowClick = async () => {
        try {
            await vacationsService.toggleFollow(vacation.id, vacation.isFollowing);
            onFollowToggle(); // Notify parent to refresh/update state locally
        } catch (error) {
            console.error("Error toggling follow status", error);
            alert("Failed to update follow status.");
        }
    };

    const handleDeleteClick = async () => {
        if (window.confirm(`Are you sure you want to delete "${vacation.destination}"?`)) {
            try {
                await vacationsService.deleteVacation(vacation.id);
                // We don't necessarily explicitly need to notify parent here if Socket.io handles the remove
                // but we could call onFollowToggle() conceptually just to trigger a refetch if we wanted to be safe
            } catch (error) {
                console.error("Error deleting vacation", error);
                alert("Failed to delete vacation.");
            }
        }
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="vacation-card">
            <div className="vacation-image-container">
                <img
                    src={`${appConfig.imageUrl}${vacation.image_name}`}
                    alt={vacation.destination}
                    className="vacation-image"
                />

                {/* Admin Controls */}
                {isAdmin && (
                    <div className="admin-controls">
                        <button
                            className="edit-btn"
                            onClick={() => navigate(`/vacations/edit/${vacation.id}`)}
                        >
                            Edit
                        </button>
                        <button
                            className="delete-btn"
                            onClick={handleDeleteClick}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <div className="vacation-details">
                <h3>{vacation.destination}</h3>

                <div className="dates-price">
                    <span className="dates">
                        <Calendar size={16} /> {formatDate(vacation.start_date)} - {formatDate(vacation.end_date)}
                    </span>
                    <span className="price">${vacation.price}</span>
                </div>

                <p className="description">{vacation.description}</p>

                {/* Follower info and action button */}
                <div className="followers-bar">
                    <div className="followers-count-container">
                        <Heart
                            size={18}
                            fill={vacation.isFollowing ? "#ef4444" : "none"}
                            color="#ef4444"
                            className={`follower-heart-icon ${!isAdmin ? 'clickable' : ''}`}
                            onClick={!isAdmin ? handleFollowClick : undefined}
                        />
                        <span className="followers-count">{vacation.followersCount}</span>
                    </div>

                    {!isAdmin && (
                        <button
                            className={`flat-follow-btn ${vacation.isFollowing ? 'following' : ''}`}
                            onClick={handleFollowClick}
                        >
                            {vacation.isFollowing ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
