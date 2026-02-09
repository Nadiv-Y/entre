import { DevelopmentTeam } from '../models/development-team';

export const getAll = async () => {
    return await DevelopmentTeam.selectAll();
};
