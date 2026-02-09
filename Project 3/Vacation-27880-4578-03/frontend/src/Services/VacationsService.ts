import api from "./api";
import type VacationModel from "../Models/VacationModel";
import { store } from "../app/store";
import { setVacations, vacationAdded, vacationUpdated, vacationDeleted, followOptimistic, unfollowOptimistic } from "../features/vacations/vacationsSlice";

class VacationsService {
    public async getAllVacations(): Promise<VacationModel[]> {
        const response = await api.get<VacationModel[]>("/vacations");
        const vacations = response.data;
        store.dispatch(setVacations(vacations));
        return vacations;
    }

    public async addVacation(vacation: VacationModel): Promise<void> {
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("fromDate", vacation.fromDate);
        formData.append("toDate", vacation.toDate);
        formData.append("price", vacation.price.toString());
        if (vacation.image) {
            formData.append("image", vacation.image[0]);
        }

        const response = await api.post<VacationModel>("/admin/vacations", formData);
        const addedVacation = response.data;
        store.dispatch(vacationAdded(addedVacation));
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("fromDate", vacation.fromDate);
        formData.append("toDate", vacation.toDate);
        formData.append("price", vacation.price.toString());
        if (vacation.image) {
            formData.append("image", vacation.image[0]);
        }

        const response = await api.put<VacationModel>(`/admin/vacations/${vacation.id}`, formData);
        const updatedVacation = response.data;
        store.dispatch(vacationUpdated(updatedVacation));
    }

    public async deleteVacation(id: number): Promise<void> {
        await api.delete(`/admin/vacations/${id}`);
        store.dispatch(vacationDeleted(id));
    }

    public async follow(vacationId: number): Promise<void> {
        await api.post(`/follows/${vacationId}`);
        store.dispatch(followOptimistic(vacationId));
    }

    public async unfollow(vacationId: number): Promise<void> {
        await api.delete(`/follows/${vacationId}`);
        store.dispatch(unfollowOptimistic(vacationId));
    }
}

const vacationsService = new VacationsService();
export default vacationsService;
