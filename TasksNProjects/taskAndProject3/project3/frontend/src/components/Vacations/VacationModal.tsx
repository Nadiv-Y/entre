import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Vacation } from "../../models/vacation";
import "./VacationModal.css";

interface VacationModalProps {
    vacation?: Vacation | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (formData: FormData) => Promise<void>;
}

interface VacationForm {
    destination: string;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
    image: FileList;
}

const VacationModal = ({ vacation, isOpen, onClose, onSave }: VacationModalProps) => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<VacationForm>();

    useEffect(() => {
        if (vacation) {
            setValue("destination", vacation.destination);
            setValue("description", vacation.description);
            // Format dates for input type="date" (YYYY-MM-DD)
            setValue("startDate", new Date(vacation.startDate).toISOString().split('T')[0]);
            setValue("endDate", new Date(vacation.endDate).toISOString().split('T')[0]);
            setValue("price", vacation.price);
        } else {
            reset();
        }
    }, [vacation, isOpen, setValue, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data: VacationForm) => {
        const formData = new FormData();
        formData.append("destination", data.destination);
        formData.append("description", data.description);
        formData.append("startDate", data.startDate);
        formData.append("endDate", data.endDate);
        formData.append("price", data.price.toString());
        if (data.image && data.image.length > 0) {
            formData.append("image", data.image[0]);
        }

        await onSave(formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{vacation ? "Edit Vacation" : "Add Vacation"}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Destination</label>
                        <input type="text" {...register("destination", { required: "Required" })} />
                        {errors.destination && <span className="error">{errors.destination.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea {...register("description", { required: "Required" })}></textarea>
                        {errors.description && <span className="error">{errors.description.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Start Date</label>
                        <input type="date" {...register("startDate", { required: "Required" })} />
                        {errors.startDate && <span className="error">{errors.startDate.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>End Date</label>
                        <input type="date" {...register("endDate", { required: "Required" })} />
                        {errors.endDate && <span className="error">{errors.endDate.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" step="0.01" {...register("price", { required: "Required", min: 0 })} />
                        {errors.price && <span className="error">{errors.price.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Image</label>
                        <input 
                            type="file" 
                            accept="image/*" 
                            {...register("image", { 
                                required: !vacation ? "Image is required for new vacations" : false 
                            })} 
                        />
                        {errors.image && <span className="error">{errors.image.message}</span>}
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VacationModal;
