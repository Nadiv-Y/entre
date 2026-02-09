import axios from 'axios';
import { Team } from '../models/team';
import { Meeting } from '../models/meeting';

class DataService {
    
    private static URL = "http://localhost:3001/api";

    public async getAllTeams(): Promise<Team[]> {
        const response = await axios.get<Team[]>(`${DataService.URL}/teams`);
        return response.data;
    }

    public async getMeetingsByGroup(groupId: number): Promise<Meeting[]> {
        const response = await axios.get<Meeting[]>(`${DataService.URL}/meetings/${groupId}`);
        return response.data;
    }

    public async addMeeting(meeting: Meeting): Promise<Meeting> {
        const response = await axios.post<Meeting>(`${DataService.URL}/meetings`, meeting);
        return response.data;
    }
}

const dataService = new DataService();
export default dataService;