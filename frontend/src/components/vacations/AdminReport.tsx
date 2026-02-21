import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import vacationsService from '../../services/VacationsService';

// Initialize chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const AdminReport: React.FC = () => {
    const [chartData, setChartData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndPrepareData = async () => {
            try {
                const allVacations = await vacationsService.getAllVacations();

                // Requirement: Only show vacations that have at least 1 follower
                const followedVacations = allVacations.filter(v => v.followersCount > 0);

                const data = {
                    labels: followedVacations.map(v => v.destination),
                    datasets: [
                        {
                            label: 'Number of Followers',
                            data: followedVacations.map(v => v.followersCount),
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                };

                setChartData(data);
            } catch (err: any) {
                setError("Failed to load report data.");
            } finally {
                setLoading(false);
            }
        };

        fetchAndPrepareData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Vacation Followers Report',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1 // Since followers are integers
                }
            }
        }
    };

    if (loading) return <div className="loading">Loading report...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="admin-form-container" style={{ maxWidth: '800px' }}>
            <h2>Followers Report</h2>
            {chartData && chartData.labels.length > 0 ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p style={{ textAlign: 'center' }}>No vacations currently have any followers.</p>
            )}
        </div>
    );
};
