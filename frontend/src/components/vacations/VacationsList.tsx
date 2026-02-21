import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { VacationModel } from '../../models/VacationModel';
import vacationsService from '../../services/VacationsService';
import appConfig from '../../utils/Config';
import { VacationCard } from './VacationCard';

export const VacationsList: React.FC = () => {
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVacations = async () => {
        try {
            setLoading(true);
            const data = await vacationsService.getAllVacations();
            setVacations(data);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.error || "Failed to load vacations.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVacations();

        // ---------------- Socket.io Integration ---------------- //
        const socket = io(appConfig.socketUrl);

        // Listen for new vacations
        socket.on('vacation_added', (newVacation: VacationModel) => {
            setVacations(prev => {
                const newList = [...prev, newVacation];
                // Note: Complex re-sorting based on UI could happen here
                return newList;
            });
        });

        // Listen for updated vacations
        socket.on('vacation_updated', (updatedVacation: VacationModel) => {
            setVacations(prev =>
                prev.map(v => v.id === updatedVacation.id ? { ...v, ...updatedVacation } : v)
            );
        });

        // Listen for deleted vacations
        socket.on('vacation_deleted', (deletedId: number) => {
            setVacations(prev => prev.filter(v => v.id !== deletedId));
        });

        // Cleanup on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    // Function passed to child cards to manually trigger a refetch or local update
    const handleFollowToggle = () => {
        // Since following implies sorting changes, the easiest & safest approach here 
        // is to re-fetch the list so the DB's complex "ORDER BY" query applies correctly.
        fetchVacations();
    };

    if (loading) return <div className="loading">Loading vacations...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="vacations-container">
            <h2>Available Vacations</h2>

            {vacations.length === 0 ? (
                <p>No vacations found.</p>
            ) : (
                <div className="vacations-grid">
                    {vacations.map(v => (
                        <VacationCard
                            key={v.id}
                            vacation={v}
                            onFollowToggle={handleFollowToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
