import { Card, CardBody, CardFooter, CardHeader, CardSubtitle } from 'react-bootstrap'
import FollowButton from './FollowButton'
import { VacationModel } from '../models/VacationModel'
import { useAppSelector } from '../redux/store';

interface VacCardProps {
    vacation: VacationModel;
}

export default function VacCard({ vacation }: VacCardProps) {
    const lastUpdatedId = useAppSelector(state => state.vacations.lastUpdatedId);
    const imageUrl = `http://localhost:3001/api/vacations/images/${vacation.picture}`;

    const isHighlighted = vacation.id === lastUpdatedId;

    return (
        <div>
            <Card className={`mt-2 mb-3 shadow-sm ${isHighlighted ? 'real-time-highlight' : ''}`}>
                <CardHeader>
                    <FollowButton vacationId={vacation.id!} isFollowing={vacation.isFollowing!} />
                </CardHeader>
                <CardBody className='d-flex flex-column align-items-center' style={{ height: '400px' }}>
                    <Card.Title className="text-center">
                        <h3 className='text-primary text-truncate' style={{ maxWidth: '250px' }}>{vacation.destination}</h3>
                    </Card.Title>
                    <CardSubtitle className="mb-2 text-center">
                        <p className='text-muted' style={{ height: '3em', overflow: 'hidden' }}>{vacation.description}</p>
                    </CardSubtitle>
                    <CardSubtitle className="text-center">
                        <h5 className='dates text-primary p-2 border border-2 border-primary rounded-pill'>
                            {new Date(vacation.startDate!).toLocaleDateString()} - {new Date(vacation.endDate!).toLocaleDateString()}
                        </h5>
                    </CardSubtitle>
                    <Card.Img
                        variant="top"
                        className='mt-3'
                        src={imageUrl}
                        style={{ height: '180px', objectFit: 'cover', borderRadius: '10px' }}
                    />
                </CardBody>
                <CardFooter className="text-center">
                    <Card.Title><h3 className='h2 text-primary'>${vacation.price}</h3></Card.Title>
                </CardFooter>
            </Card>
        </div>
    )
}
