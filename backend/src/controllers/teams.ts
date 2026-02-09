import { Team } from '../models/team';

export const getAllTeams = async () => {
    return await Team.getAll();
};