import { Card, CardBody, CardFooter, CardHeader, CardSubtitle } from 'react-bootstrap'
import { Pencil, XLg } from 'react-bootstrap-icons'
import { VacationModel } from '../models/VacationModel'
import { useNavigate } from 'react-router-dom'
import vacationService from '../services/VacationService'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { deleteVacation } from '../redux/vacationSlice'

interface AdminVacCardProps {
    vacation: VacationModel;
}

export default function AdminVacCard({ vacation }: AdminVacCardProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const lastUpdatedId = useAppSelector(state => state.vacations.lastUpdatedId);

    async function removeVacation() {
        if (!window.confirm("Are you sure you want to delete this vacation?")) return;

        try {
            await vacationService.deleteVacation(vacation.id!);
            dispatch(deleteVacation(vacation.id!));
        } catch (err: any) {
            alert(err.message);
        }
    }

    const imageUrl = `http://localhost:3001/api/vacations/images/${vacation.picture}`;

    const isHighlighted = vacation.id === lastUpdatedId;

    return (
        <div>
            <Card className={`mt-2 mb-3 shadow-sm ${isHighlighted ? 'real-time-highlight' : ''}`}>
                <CardHeader>
                    <div className='d-flex justify-content-between'>
                        <button className="btn btn-outline-primary border-0" onClick={() => navigate("/admin/edit/" + vacation.id)}>
                            <Pencil />
                        </button>
                        <button className="btn btn-outline-danger border-0" onClick={removeVacation}>
                            <XLg />
                        </button>
                    </div>
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
