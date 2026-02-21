import axios from '../utils/interceptors'; // Import our configured axios instance!
import appConfig from '../utils/Config';
import { VacationModel } from '../models/VacationModel';

class VacationsService {
    /**
     * Get all vacations for the current user
     */
    public async getAllVacations(): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
        return response.data;
    }

    /**
     * Toggle follow status for a vacation
     */
    public async toggleFollow(vacationId: number, isCurrentlyFollowing: boolean): Promise<void> {
        if (isCurrentlyFollowing) {
            await axios.delete(appConfig.followersUrl + vacationId);
        } else {
            await axios.post(appConfig.followersUrl + vacationId, {});
        }
    }
    /**
     * Add a new vacation (Admin)
     */
    public async addVacation(vacationContent: FormData): Promise<VacationModel> {
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacationContent);
        return response.data;
    }

    /**
     * Update an existing vacation (Admin)
     */
    public async editVacation(id: number, vacationContent: FormData): Promise<void> {
        await axios.put(appConfig.vacationsUrl + id, vacationContent);
    }
    /**
     * Delete a vacation (Admin)
     */
    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + id);
    }
}

const vacationsService = new VacationsService();
export default vacationsService;
