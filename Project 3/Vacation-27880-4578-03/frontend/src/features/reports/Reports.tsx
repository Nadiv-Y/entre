import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Box, Container, Typography } from "@mui/material";
import api from "../../Services/api";
import React from "react";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ReportModel {
    vacationId: number;
    destination: string;
    followersCount: number;
}

export function Reports(): React.JSX.Element {
    const [data, setData] = useState<ReportModel[]>([]);

    useEffect(() => {
        api.get<ReportModel[]>("/admin/reports/followers")
            .then(response => {
                setData(response.data);
            })
            .catch(() => alert("Error fetching reports"));
    }, []);

    const chartData = {
        labels: data.map(item => item.destination),
        datasets: [
            {
                label: 'Followers',
                data: data.map(item => item.followersCount),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Vacation Followers',
            },
        },
        scales: {
            y: {
                ticks: {
                    stepSize: 1 // Followers are integers
                }
            }
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Vacation Reports
            </Typography>
            <Box sx={{ height: 500, width: '100%' }}>
                <Bar options={options} data={chartData} />
            </Box>
        </Container>
    );
}
