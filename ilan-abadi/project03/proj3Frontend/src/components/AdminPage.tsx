import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AdminVacCard from './AdminVacCard';
import vacationService from '../services/VacationService';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setVacations } from '../redux/vacationSlice';
import SignOut from './SignOut';

export default function AdminPage() {
    const vacations = useAppSelector(state => state.vacations.vacations);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch vacations on component mount
        vacationService.getAllVacations()
            .then(vacs => dispatch(setVacations(vacs)))
            .catch(err => alert(err.message));
    }, [dispatch]);

    return (
        <div className="page-container-green">
            <div className='d-flex justify-content-center'>
                <button
                    className='btn btn-primary mt-2'
                    onClick={() => navigate('/admin/add')}
                >
                    Add Vacation
                </button>
                <button
                    className='btn btn-primary mt-2 mx-2 text-white'
                    onClick={() => navigate('/admin/report')}
                >
                    Reports
                </button>
                <SignOut />
            </div>
            <Container className='mt-2'>
                <Row className='justify-content-center'>
                    {vacations.map(v => (
                        <Col key={v.id} sm={12} md={6} lg={4}>
                            <AdminVacCard vacation={v} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}
