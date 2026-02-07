import type { Vacation } from "../../models/vacation";
import { useAuth } from "../../context/useAuth";
import vacationsService from "../../services/vacations-service";
import "./VacationCard.css";
import { useState } from "react";
// import socket for admin updates (handled in list or globally) 
// but for follow/unfollow we might want optimistic UI.

interface VacationCardProps {
    vacation: Vacation;
    onFollow?: (vacation: Vacation) => void;
    onEdit?: (vacation: Vacation) => void;
    onDelete?: (id: number) => void;
}

const VacationCard = ({ vacation, onFollow, onEdit, onDelete }: VacationCardProps) => {
    const { user } = useAuth();
    // No local state for vacation props to ensure single source of truth from parent list
    const isFollowed = vacation.isFollowed;
    const followersCount = vacation.followersCount;

    // We assume images are served from http://localhost:3001/upload/filename
    const imageUrl = `http://localhost:3001/upload/${vacation.imageFilename}`;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="card vacation-card">
            {user?.role === "Admin" && (
                <div className="admin-actions">
                    <button className="btn-icon edit" onClick={() => onEdit && onEdit(vacation)}>✏️</button>
                    <button className="btn-icon delete" onClick={() => onDelete && onDelete(vacation.vacationId)}>🗑️</button>
                </div>
            )}

            <div className="image-container" style={{ backgroundImage: `url(${imageUrl})` }}>
                {user?.role !== "Admin" && onFollow && (
                    <button className={`follow-btn ${isFollowed ? "followed" : ""}`} onClick={() => onFollow(vacation)}>
                        {isFollowed ? "❤️" : "🤍"} {followersCount}
                    </button>
                )}
            </div>

            <div className="card-content">
                <h3>{vacation.destination}</h3>
                <div className="dates">
                    📅 {formatDate(vacation.startDate)} - {formatDate(vacation.endDate)}
                </div>
                <p className="description">{vacation.description}</p>
                <div className="price">
                    ${vacation.price}
                </div>
            </div>
        </div>
    );
};

export default VacationCard;
