import { execute } from "../dal/dal";

// Returns vacations that have at least one follower, with the count.
// "Reports: גרף עמודות שמציג לכל חופשה את מספר העוקבים (להציג רק חופשות שיש להן עוקבים)."
const getFollowersStats = async () => {
    const sql = `
        SELECT 
            V.destination, 
            COUNT(F.userId) as followersCount
        FROM vacations V
        JOIN followers F ON V.vacationId = F.vacationId
        GROUP BY V.vacationId
        HAVING followersCount > 0
    `;
    const stats = await execute(sql);
    return stats;
};

export default {
    getFollowersStats
};
