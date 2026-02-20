import React from "react";
import { useDispatch } from "react-redux";
import { Vacation, toggleFollow } from "../redux/vacationsSlice";
import { AppDispatch } from "../redux/store";
import api from "../services/api";

const API_URL = process.env.REACT_APP_API_URL?.replace("/api", "") || "http://localhost:4000";

interface Props {
  vacation: Vacation;
  isAdmin: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function VacationCard({ vacation, isAdmin, onEdit, onDelete }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const v = vacation;

  async function handleFollow() {
    dispatch(toggleFollow({ vacationId: v.id, followed: !v.isFollowed }));
    try {
      if (v.isFollowed) {
        await api.delete(`/vacations/${v.id}/follow`);
      } else {
        await api.post(`/vacations/${v.id}/follow`);
      }
    } catch {
      dispatch(toggleFollow({ vacationId: v.id, followed: v.isFollowed }));
    }
  }

  const imageUrl = `${API_URL}/upload/${v.image_filename}`;

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={imageUrl}
        className="card-img-top"
        alt={v.destination}
        style={{ height: 200, objectFit: "cover" }}
        onError={e => { (e.target as HTMLImageElement).src = "https://placehold.co/400x200?text=Vacation"; }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{v.destination}</h5>
        <p className="card-text text-muted small flex-grow-1">{v.description}</p>
        <div className="d-flex justify-content-between align-items-center small text-muted mb-2">
          <span>📅 {v.start_date?.slice(0, 10)} → {v.end_date?.slice(0, 10)}</span>
          <span className="fw-bold text-success">${Number(v.price).toFixed(2)}</span>
        </div>

        {isAdmin ? (
          <div className="d-flex gap-2 mt-auto">
            <button className="btn btn-outline-primary btn-sm flex-grow-1" onClick={() => onEdit(v.id)}>
              ✏️ Edit
            </button>
            <button className="btn btn-outline-danger btn-sm flex-grow-1" onClick={() => onDelete(v.id)}>
              🗑️ Delete
            </button>
          </div>
        ) : (
          <button
            className={`btn btn-sm mt-auto w-100 ${v.isFollowed ? "btn-danger" : "btn-outline-primary"}`}
            onClick={handleFollow}
          >
            {v.isFollowed ? "❤️ Unfollow" : "🤍 Follow"} ({v.follower_count})
          </button>
        )}
      </div>
    </div>
  );
}
