import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useAppSelector } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';

export default function VacFollowReport() {
    const vacations = useAppSelector(state => state.vacations.vacations);
    const navigate = useNavigate();

    // Prepare data for the chart: only vacations with 1 or more followers
    const chartData = vacations
        .filter(v => (v.followersCount || 0) > 0)
        .map(v => ({
            name: v.destination,
            followers: v.followersCount
        }));

    const margin = { top: 20, right: 30, left: 20, bottom: 60 };

    const renderCustomBarLabel = ({ x, y, width, value }: any) => {
        return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-10}>{value}</text>;
    };

    return (
        <div className="page-container-green p-4" style={{ minHeight: '80vh' }}>
            <a href="/home" className='text-dark nav-link text-start mb-3'>
                <ArrowLeft className="me-2" />Back to Vacations
            </a>
            <div className="bg-white rounded shadow p-4" style={{ height: '500px' }}>
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={margin}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                                height={70}
                            />
                            <YAxis allowDecimals={false} label={{ value: 'Followers', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Bar
                                dataKey="followers"
                                fill="#0D6EFD"
                                label={renderCustomBarLabel}
                                barSize={50}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <p className="text-muted fs-4">No vacations are being followed yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
