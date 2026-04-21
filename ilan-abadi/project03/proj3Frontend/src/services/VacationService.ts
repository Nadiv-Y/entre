import api from "./api";
import { VacationModel } from "../models/VacationModel";

class VacationService {

    // Get all vacations
    public async getAllVacations(): Promise<VacationModel[]> {
        const response = await api.get<VacationModel[]>("/api/vacations");
        return response.data;
    }

    // Add new vacation (Admin only)
    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        const formData = new FormData();
        formData.append("description", vacation.description!);
        formData.append("destination", vacation.destination!);
        if (vacation.image) {
            formData.append("image", vacation.image);
        }
        formData.append("startDate", vacation.startDate!);
        formData.append("endDate", vacation.endDate!);
        formData.append("price", vacation.price!.toString());

        const response = await api.post<VacationModel>("/api/vacations", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    }

    // Update existing vacation (Admin only)
    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        const formData = new FormData();
        formData.append("description", vacation.description!);
        formData.append("destination", vacation.destination!);
        if (vacation.image) {
            formData.append("image", vacation.image);
        }
        formData.append("startDate", vacation.startDate!);
        formData.append("endDate", vacation.endDate!);
        formData.append("price", vacation.price!.toString());

        const response = await api.put<VacationModel>("/api/vacations/" + vacation.id, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    }

    // Delete a vacation (Admin only)
    public async deleteVacation(id: number): Promise<void> {
        await api.delete("/api/vacations/" + id);
    }

    // Follow a vacation (User)
    public async followVacation(id: number): Promise<void> {
        await api.post("/api/vacations/" + id + "/follow");
    }

    // Unfollow a vacation (User)
    public async unfollowVacation(id: number): Promise<void> {
        await api.delete("/api/vacations/" + id + "/follow");
    }
}

const vacationService = new VacationService();
export default vacationService;
