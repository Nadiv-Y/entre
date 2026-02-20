import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../redux/store";
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
import api from "../services/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ReportRow { destination: string; follower_count: number; }

export default function Reports() {
  const navigate = useNavigate();
  const user = useSelector((s: RootState) => s.auth.user);
  const [data, setData] = useState<ReportRow[]>([]);

  useEffect(() => {
    if (!user?.is_admin) { navigate("/vacations"); return; }
    api.get("/vacations/report").then(res => setData(res.data));
  }, [navigate, user]);

  const chartData = {
    labels: data.map(r => r.destination),
    datasets: [{
      label: "Followers",
      data: data.map(r => r.follower_count),
      backgroundColor: "rgba(13, 110, 253, 0.7)",
      borderColor: "rgba(13, 110, 253, 1)",
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Follower Count by Destination (≥1 follower)" },
    },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">📊 Vacation Follower Report</h2>
      {data.length === 0 ? (
        <p className="text-muted">No vacations with followers yet.</p>
      ) : (
        <div className="card shadow p-4">
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
}
