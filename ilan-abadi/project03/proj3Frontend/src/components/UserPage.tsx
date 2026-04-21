import { useEffect } from 'react';
import VacCard from './VacCard';
import { Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../redux/store';
import vacationService from '../services/VacationService';
import { setVacations } from '../redux/vacationSlice';
import SignOut from './SignOut';

export default function UserPage() {
  const user = useAppSelector(state => state.auth.user);
  const vacations = useAppSelector(state => state.vacations.vacations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    vacationService.getAllVacations()
      .then(v => dispatch(setVacations(v)))
      .catch(err => alert(err.message));
  }, [dispatch]);

  // Sort: Following first, then by date
  const sortedVacations = [...vacations].sort((a, b) => {
    // 1. Primary Sort: followed first
    if (a.isFollowing && !b.isFollowing) return -1;
    if (!a.isFollowing && b.isFollowing) return 1;

    // 2. Secondary Sort: start date ascending
    return new Date(a.startDate!).getTime() - new Date(b.startDate!).getTime();
  });

  return (
    <div className="page-container-green">
      <div className='d-flex justify-content-center'>
        <h2 className='mt-2 mx-3'>{`Hi ${user?.firstName}, Choose vacations to follow`}</h2>
        <SignOut />
      </div>
      <Container>
        <Row className='justify-content-center'>
          {sortedVacations.map(v => (
            <Col key={v.id} sm={12} md={6} lg={4}>
              <VacCard vacation={v} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
