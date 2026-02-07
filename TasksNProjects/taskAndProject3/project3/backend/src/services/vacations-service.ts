import { execute } from "../dal/dal";
import { Vacation } from "../models/vacation";

const getAllVacations = async (userId: number): Promise<Vacation[]> => {
    const sql = `
        SELECT 
            V.*, 
            COUNT(F.userId) AS followersCount,
            IF(EXISTS(SELECT * FROM followers WHERE vacationId = V.vacationId AND userId = ?), 1, 0) AS isFollowed
        FROM vacations V
        LEFT JOIN followers F ON V.vacationId = F.vacationId
        GROUP BY V.vacationId
        ORDER BY isFollowed DESC, startDate ASC
    `;

    const vacations = await execute(sql, [userId]);
    return vacations;
};

const follow = async (userId: number, vacationId: number): Promise<void> => {
    const sql = `INSERT INTO followers (userId, vacationId) VALUES (?, ?)`;
    await execute(sql, [userId, vacationId]);
};

const unfollow = async (userId: number, vacationId: number): Promise<void> => {
    const sql = `DELETE FROM followers WHERE userId = ? AND vacationId = ?`;
    await execute(sql, [userId, vacationId]);
};

// Admin Functions

const addVacation = async (vacation: Vacation): Promise<Vacation> => {
    const sql = `
        INSERT INTO vacations (destination, description, startDate, endDate, price, imageFilename)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const info: any = await execute(sql, [
        vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
        vacation.imageFilename
    ]);
    vacation.vacationId = info.insertId;
    return vacation;
};

const updateVacation = async (vacation: Vacation): Promise<Vacation> => {
    // If no new image, we keep the old one. This logic is usually handled in controller or here.
    // Assuming controller sends the correct filename (either new or old).

    let sql = `
        UPDATE vacations SET
            destination = ?,
            description = ?,
            startDate = ?,
            endDate = ?,
            price = ?
    `;
    const params = [
        vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.endDate,
        vacation.price
    ];

    if (vacation.imageFilename) {
        sql += `, imageFilename = ?`;
        params.push(vacation.imageFilename);
    }

    sql += ` WHERE vacationId = ?`;
    params.push(vacation.vacationId);

    await execute(sql, params);

    // Fetch updated vacation to return complete object including unchanged image
    if (!vacation.imageFilename) {
        // Optimization: We could return 'vacation' as is, but if imageFilename is missing, the frontend might need it.
        // However, the frontend usually updates its state with the response. 
        // If we return a vacation object without imageFilename, the frontend might clear the image. 
        // Let's perform a SELECT to be safe and return the full updated object.
        const [updated] = await execute("SELECT * FROM vacations WHERE vacationId = ?", [vacation.vacationId]);
        return updated;
    }

    return vacation;
};

const deleteVacation = async (vacationId: number): Promise<void> => {
    const sql = `DELETE FROM vacations WHERE vacationId = ?`;
    await execute(sql, [vacationId]);
};

export default {
    getAllVacations,
    follow,
    unfollow,
    addVacation,
    updateVacation,
    deleteVacation
};
