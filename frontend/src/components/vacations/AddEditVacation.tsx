import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import vacationsService from '../../services/VacationsService';
import appConfig from '../../utils/Config';
import { VacationModel } from '../../models/VacationModel';

export const AddEditVacation: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<VacationModel>();
    const navigate = useNavigate();

    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [currentImage, setCurrentImage] = useState<string>('');

    // Fetch existing vacation data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            const fetchVacation = async () => {
                try {
                    const allVacations = await vacationsService.getAllVacations();
                    const vacationToEdit = allVacations.find(v => v.id === Number(id));
                    if (vacationToEdit) {
                        setValue('description', vacationToEdit.description);
                        setValue('destination', vacationToEdit.destination);
                        // Convert dates to YYYY-MM-DD for the input[type="date"]
                        setValue('start_date', new Date(vacationToEdit.start_date).toISOString().split('T')[0]);
                        setValue('end_date', new Date(vacationToEdit.end_date).toISOString().split('T')[0]);
                        setValue('price', vacationToEdit.price);

                        // We store the existing image name to send it back if no new image is uploaded
                        setValue('image_name', vacationToEdit.image_name);
                        setCurrentImage(vacationToEdit.image_name);
                    }
                } catch (err) {
                    setSubmitError('Failed to load vacation for editing.');
                }
            };
            fetchVacation();
        }
    }, [isEditMode, id, setValue]);

    const startDateValue = watch('start_date');

    const onSubmit = async (data: VacationModel) => {
        try {
            setSubmitError(null);
            const formData = new FormData();
            formData.append('description', data.description);
            formData.append('destination', data.destination);
            formData.append('start_date', data.start_date);
            formData.append('end_date', data.end_date);
            formData.append('price', data.price.toString());

            // Only append image if one was uploaded
            if (data.image && data.image.length > 0) {
                formData.append('image', data.image[0]);
            } else if (isEditMode) {
                // If editing and no new image, we must send back the existing image name
                formData.append('existing_image', data.image_name);
            }

            if (isEditMode) {
                await vacationsService.editVacation(Number(id), formData);
                setSuccessMessage('Vacation updated successfully!');
            } else {
                await vacationsService.addVacation(formData);
                setSuccessMessage('Vacation added successfully!');
            }

            // Short delay so the user can see the success message before redirecting
            setTimeout(() => {
                navigate('/vacations');
            }, 1000);

        } catch (err: any) {
            setSubmitError(err.response?.data?.error || 'An error occurred while saving the vacation');
        }
    };

    return (
        <div className="admin-form-container">
            <h2>{isEditMode ? 'Edit Vacation' : 'Add New Vacation'}</h2>

            {successMessage && <div className="success-message">{successMessage}</div>}
            {submitError && <div className="error-message">{submitError}</div>}

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                    <label>Destination</label>
                    <input
                        type="text"
                        {...register('destination', { required: 'Destination is required' })}
                    />
                    {errors.destination && <span className="error">{errors.destination.message}</span>}
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        rows={4}
                        {...register('description', { required: 'Description is required' })}
                    />
                    {errors.description && <span className="error">{errors.description.message}</span>}
                </div>

                <div className="form-row dates-row">
                    <div className="form-group">
                        <label>Start Date</label>
                        <input
                            type="date"
                            {...register('start_date', {
                                required: 'Start date is required',
                                validate: value => new Date(value) >= new Date(new Date().setHours(0, 0, 0, 0)) || "Start date cannot be in the past"
                            })}
                        />
                        {errors.start_date && <span className="error">{errors.start_date.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>End Date</label>
                        <input
                            type="date"
                            {...register('end_date', {
                                required: 'End date is required',
                                validate: value => !startDateValue || new Date(value) >= new Date(startDateValue) || "End date must be after Start Date"
                            })}
                        />
                        {errors.end_date && <span className="error">{errors.end_date.message}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label>Price ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register('price', {
                            required: 'Price is required',
                            min: { value: 0, message: 'Price cannot be negative' },
                            max: { value: 10000, message: 'Price cannot exceed 10,000' }
                        })}
                    />
                    {errors.price && <span className="error">{errors.price.message}</span>}
                </div>

                <div className="form-group">
                    <label>Image</label>

                    {isEditMode && currentImage && (
                        <div className="current-image-preview">
                            <p>Current Image:</p>
                            <img src={`${appConfig.imageUrl}${currentImage}`} alt="Current" />
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        {...register('image', {
                            required: isEditMode ? false : 'Image is required for new vacations'
                        })}
                    />
                    {errors.image && <span className="error">{errors.image.message}</span>}
                </div>

                <button type="submit" className="submit-btn">
                    {isEditMode ? 'Update Vacation' : 'Add Vacation'}
                </button>
            </form>
        </div>
    );
};
