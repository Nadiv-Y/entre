import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import reportsService from "../../services/reports-service";
import "./Reports.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ReportData {
    destination: string;
    followersCount: number;
}

const Reports = () => {
    const [reportData, setReportData] = useState<ReportData[]>([]);

    useEffect(() => {
        reportsService.getFollowersStats()
            .then(setReportData)
            .catch(err => alert(err.message));
    }, []);

    const data = {
        labels: reportData.map(d => d.destination),
        datasets: [
            {
                label: 'Followers',
                data: reportData.map(d => d.followersCount),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgb(53, 162, 235)',
                borderWidth: 1,
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
                text: 'Vacations Followers',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    return (
        <div className="reports-page">
            <h2>Reports</h2>
            <div className="chart-container">
                <Bar options={options} data={data} />
            </div>
        </div>
    );
};

export default Reports;
