/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import type VacationModel from "../../Models/VacationModel";
import vacationsService from "../../Services/VacationsService";
import React, { useEffect, useState } from "react";

interface VacationModalProps {
    open: boolean;
    onClose: () => void;
    vacationToEdit?: VacationModel;
}

export function VacationModal({ open, onClose, vacationToEdit }: VacationModalProps): React.JSX.Element {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<VacationModel>();
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (open) {
            setTimeout(() => setError(""), 0);
            if (vacationToEdit) {
                setValue("destination", vacationToEdit.destination);
                setValue("description", vacationToEdit.description);
                setValue("fromDate", new Date(vacationToEdit.fromDate).toISOString().split('T')[0]);
                setValue("toDate", new Date(vacationToEdit.toDate).toISOString().split('T')[0]);
                setValue("price", vacationToEdit.price);
            } else {
                reset({
                    destination: "",
                    description: "",
                    fromDate: "",
                    toDate: "",
                    price: 0
                } as any);
            }
        }
    }, [open, vacationToEdit, setValue, reset]);

    async function submit(vacation: VacationModel) {
        try {
            if (vacationToEdit) {
                vacation.id = vacationToEdit.id;
                await vacationsService.updateVacation(vacation);
            } else {
                await vacationsService.addVacation(vacation);
            }
            onClose();
        } catch (err: any) {
            setError(err?.response?.data || "Operation failed");
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{vacationToEdit ? "Edit Vacation" : "Add Vacation"}</DialogTitle>
            <form onSubmit={handleSubmit(submit)}>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Destination"
                        fullWidth
                        {...register("destination", { required: "Destination is required" })}
                        error={!!errors.destination}
                        helperText={errors.destination?.message}
                    />

                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        {...register("description", { required: "Description is required" })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />

                    <TextField
                        margin="dense"
                        label="From Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        {...register("fromDate", {
                            required: "Start date is required",
                            validate: (val, formValues: any) => {
                                const to = formValues.toDate;
                                if (to && new Date(val) > new Date(to)) return "Start date cannot be after end date";
                                return true;
                            }
                        })}
                        error={!!errors.fromDate}
                        helperText={errors.fromDate?.message}
                    />

                    <TextField
                        margin="dense"
                        label="To Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        {...register("toDate", {
                            required: "End date is required",
                            validate: (val, formValues: any) => {
                                const from = formValues.fromDate;
                                if (from && new Date(val) < new Date(from)) return "End date cannot be before start date";
                                return true;
                            }
                        })}
                        error={!!errors.toDate}
                        helperText={errors.toDate?.message}
                    />

                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        inputProps={{ min: 0, step: 0.01 }}
                        {...register("price", {
                            required: "Price is required",
                            min: { value: 0, message: "Price must be positive" },
                            valueAsNumber: true
                        })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />

                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            color={errors.image ? "error" : "primary"}
                        >
                            {vacationToEdit ? "Change Image (Optional)" : "Upload Image"}
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                {...register("image", { required: vacationToEdit ? false : "Image is required" } as any)}
                            />
                        </Button>
                        {errors.image && <Box color="error.main" fontSize={12} mt={1}>{errors.image.message}</Box>}
                    </Box>

                    {error && <Box color="error.main" mt={2}>{error}</Box>}

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="inherit">Cancel</Button>
                    <Button type="submit" variant="contained">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
