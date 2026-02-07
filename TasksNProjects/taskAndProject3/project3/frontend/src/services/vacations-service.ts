import api from "./api";
import type { Vacation } from "../models/vacation";

const getAllVacations = async (): Promise<Vacation[]> => {
    const response = await api.get<Vacation[]>("/vacations");
    return response.data;
};

const follow = async (vacationId: number): Promise<void> => {
    await api.post(`/vacations/follows/${vacationId}`);
};

const unfollow = async (vacationId: number): Promise<void> => {
    await api.delete(`/vacations/follows/${vacationId}`);
};

// Admin
const addVacation = async (formData: FormData): Promise<Vacation> => {
    const response = await api.post<Vacation>("/vacations", formData);
    return response.data;
};

const updateVacation = async (vacationId: number, formData: FormData): Promise<Vacation> => {
    const response = await api.put<Vacation>(`/vacations/${vacationId}`, formData);
    return response.data;
};

const deleteVacation = async (vacationId: number): Promise<void> => {
    await api.delete(`/vacations/${vacationId}`);
};

export default {
    getAllVacations,
    follow,
    unfollow,
    addVacation,
    updateVacation,
    deleteVacation
};
