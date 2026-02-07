import { useEffect, useState } from "react";
import type { Vacation } from "../../models/vacation";
import vacationsService from "../../services/vacations-service";
import { useAuth } from "../../context/useAuth";
import VacationModal from "./VacationModal";
import VacationCard from "./VacationCard";
import socketService from "../../services/socket-service";
import "./VacationsList.css";

const VacationsList = () => {
    const { user } = useAuth();
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVacation, setEditingVacation] = useState<Vacation | null>(null);

    // Fetch vacations & Setup Socket
    useEffect(() => {
        vacationsService.getAllVacations()
            .then(setVacations)
            .catch(err => alert(err.message));

        socketService.connect();

        socketService.listen(
            (addedVacation) => {
                setVacations(prev => [...prev, addedVacation]);
            },
            (updatedVacation) => {
                setVacations(prev => prev.map(v =>
                    v.vacationId === updatedVacation.vacationId
                        ? { ...v, ...updatedVacation, isFollowed: v.isFollowed, followersCount: v.followersCount }
                        : v
                ));
            },
            (deletedVacationId) => {
                setVacations(prev => prev.filter(v => v.vacationId !== deletedVacationId));
            }
        );

        return () => {
            socketService.stopListening();
        };
    }, []);

    const handleFollow = async (vacation: Vacation) => {
        try {
            // Optimistic update
            const newIsFollowed = !vacation.isFollowed;
            const newCount = vacation.followersCount + (newIsFollowed ? 1 : -1);

            // Update UI immediately
            const updatedVacations = vacations.map(v =>
                v.vacationId === vacation.vacationId
                    ? { ...v, isFollowed: newIsFollowed ? 1 : 0, followersCount: newCount }
                    : v
            );
            setVacations(updatedVacations);

            // Server request
            if (vacation.isFollowed) {
                await vacationsService.unfollow(vacation.vacationId);
            } else {
                await vacationsService.follow(vacation.vacationId);
            }
        } catch (err: any) {
            alert(err.message);
            // Revert on error (could be implemented better)
            vacationsService.getAllVacations().then(setVacations);
        }
    };

    // Admin Actions
    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this vacation?")) return;
        try {
            await vacationsService.deleteVacation(id);
            setVacations(vacations.filter(v => v.vacationId !== id));
        } catch (err: any) {
            alert(err.message);
        }
    };

    const openAddModal = () => {
        setEditingVacation(null);
        setIsModalOpen(true);
    };

    const openEditModal = (vacation: Vacation) => {
        setEditingVacation(vacation);
        setIsModalOpen(true);
    };

    const handleSave = async (formData: FormData) => {
        try {
            if (editingVacation) {
                const updated = await vacationsService.updateVacation(editingVacation.vacationId, formData);
                setVacations(vacations.map(v => v.vacationId === updated.vacationId ? updated : v));
            } else {
                const added = await vacationsService.addVacation(formData);
                setVacations([...vacations, added]);
            }
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="vacations-page">
            <h2>Vacations</h2>

            {user?.role === "Admin" && (
                <button className="btn btn-primary add-btn" onClick={openAddModal}>
                    + Add Vacation
                </button>
            )}

            <div className="vacations-grid">
                {vacations.map(v => (
                    <VacationCard
                        key={v.vacationId}
                        vacation={v}
                        onFollow={handleFollow}
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {isModalOpen && (
                <VacationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    vacation={editingVacation}
                />
            )}
        </div>
    );
};

export default VacationsList;
