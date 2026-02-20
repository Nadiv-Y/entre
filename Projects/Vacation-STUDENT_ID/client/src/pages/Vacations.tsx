import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../redux/store";
import { setVacations, selectSortedVacations } from "../redux/vacationsSlice";
import { useSocket } from "../hooks/useSocket";
import VacationCard from "../components/VacationCard";
import api from "../services/api";

export default function Vacations() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((s: RootState) => s.auth.user);
  const sorted = useSelector(selectSortedVacations);

  // Listen for real-time admin edits
  useSocket();

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    api.get("/vacations").then(res => dispatch(setVacations(res.data)));
  }, [dispatch, navigate, user]);

  return (
    <div className="container py-4">
      <h2 className="mb-4">🌍 Available Vacations</h2>
      {sorted.length === 0 ? (
        <p className="text-muted">No vacations available yet.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {sorted.map(v => (
            <div className="col" key={v.id}>
              <VacationCard
                vacation={v}
                isAdmin={false}
                onEdit={() => { }}
                onDelete={() => { }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
