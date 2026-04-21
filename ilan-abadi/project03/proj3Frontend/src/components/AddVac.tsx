import { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Image } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { VacationModel } from '../models/VacationModel'
import vacationService from '../services/VacationService'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { addVacation, updateVacation } from '../redux/vacationSlice'

export default function AddVac() {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const vacations = useAppSelector(state => state.vacations.vacations);

    const { register, handleSubmit, reset, setValue } = useForm<VacationModel>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (isEditMode) {
            const vacationToEdit = vacations.find(v => v.id === +id);
            if (vacationToEdit) {
                // Formatting dates for the input type="date"
                const formatted = {
                    ...vacationToEdit,
                    startDate: vacationToEdit.startDate?.split('T')[0],
                    endDate: vacationToEdit.endDate?.split('T')[0]
                };
                reset(formatted);
                if (vacationToEdit.picture) {
                    setImagePreview(`http://localhost:3001/api/vacations/images/${vacationToEdit.picture}`);
                }
            }
        }
    }, [id, isEditMode, vacations, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue('image', file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    async function submit(vacation: VacationModel) {
        try {
            if (isEditMode) {
                const updated = await vacationService.updateVacation(vacation);
                dispatch(updateVacation(updated));
            } else {
                const added = await vacationService.addVacation(vacation);
                dispatch(addVacation(added));
            }
            navigate('/home');
        } catch (err: any) {
            alert(err.response?.data || err.message);
        }
    }

    return (
        <div className="page-container-green pb-5">
            <div className='col-md-8 col-lg-6 rounded-4 shadow p-4 m-4 text-start bg-white mx-auto border border-primary'>
                <h2 className="text-center text-primary mb-4">{isEditMode ? 'Edit Vacation' : 'Add New Vacation'}</h2>
                <Form onSubmit={handleSubmit(submit)}>
                    <Form.Group className='mt-3' controlId='destination'>
                        <Form.Label className='fs-5 text-secondary'>Destination:</Form.Label>
                        <Form.Control
                            type='text'
                            className='py-2 fs-5'
                            {...register('destination', { required: true })}
                        />
                    </Form.Group>

                    <Form.Group className='mt-3' controlId='description'>
                        <Form.Label className='fs-5 text-secondary'>Description:</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            className='py-2 fs-5'
                            {...register('description', { required: true })}
                        />
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3' controlId='dates'>
                        <Col>
                            <Form.Label className='fs-5 text-secondary'>Start Date:</Form.Label>
                            <Form.Control
                                type='date'
                                className='py-2 fs-5'
                                {...register('startDate', { required: true })}
                            />
                        </Col>
                        <Col>
                            <Form.Label className='fs-5 text-secondary'>End Date:</Form.Label>
                            <Form.Control
                                type='date'
                                className='py-2 fs-5'
                                {...register('endDate', { required: true })}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group className='mt-3' controlId='price'>
                        <Form.Label className='fs-5 text-secondary'>Price ($):</Form.Label>
                        <Form.Control
                            type='number'
                            step="0.01"
                            className='py-2 fs-5'
                            {...register('price', { required: true, valueAsNumber: true })}
                        />
                    </Form.Group>

                    <Form.Group className='mt-3' controlId='image'>
                        <Form.Label className='fs-5 text-secondary'>Vacation Image:</Form.Label>
                        <Form.Control
                            type='file'
                            accept="image/*"
                            className='py-2 fs-5'
                            onChange={handleImageChange}
                        />
                    </Form.Group>

                    {imagePreview && (
                        <div className="text-center mt-3">
                            <Image src={imagePreview} thumbnail style={{ maxHeight: '200px' }} />
                        </div>
                    )}

                    <div className='d-grid gap-2 mt-5'>
                        <Button variant='primary' size="lg" type="submit">
                            {isEditMode ? 'Update Vacation' : 'Add Vacation'}
                        </Button>
                        <Button variant='secondary' size="lg" onClick={() => navigate('/home')}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}
